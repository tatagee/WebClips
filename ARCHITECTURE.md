# WebClips 知识库系统架构文档

> 本文档记录 WebClips 知识管理系统的设计理念、架构决策和实施细节。
> 便于后续对工作流进行调整和增强时参考。

---

## 1. 设计起源与理论基础

### 1.1 两套方法论的融合

本系统融合了两套知识管理方法论：

#### BASB CODE 方法论（Tiago Forte）
源自 *Building a Second Brain*，将知识管理分为四个阶段：
- **C**apture（捕获）：保存有共鸣的信息
- **O**rganize（整理）：按项目/领域分类
- **D**istill（提炼）：渐进式摘要，层层浓缩
- **E**xpress（表达）：将知识转化为创作输出

#### LLM Knowledge Base 方法论（Andrej Karpathy）
将知识库视为一个 **LLM 编译的 Wiki**：
- **Data Ingest**：原始文章索引到 raw 目录
- **Compile Wiki**：LLM 增量编译成结构化 Wiki（.md 集合）
- **Q&A**：对 Wiki 进行复杂问题的研究式问答
- **Output**：生成 Markdown、幻灯片、图表等输出
- **Linting**：定期健康检查，发现不一致、缺失、新关联
- **核心原则**：Wiki 由 LLM 维护，用户几乎不直接编辑

### 1.2 融合映射

| Karpathy 阶段 | CODE 阶段 | 本系统实现 | 对应工作流 |
|:-------------:|:---------:|:---------:|:---------:|
| Data Ingest | Capture | `01_Inbox/` → `02_Library/` | `/organize-webclips` |
| Compile Wiki | Organize + Distill | `02_Library/` → `03_Wiki/` | `/compile-wiki` |
| Q&A + Output | Express | `03_Wiki/` → `04_Output/` | `/query-wiki` |
| Linting | 质量维护 | 全局健康检查 | `/lint-wiki` |

---

## 2. 目录结构设计

```
WebClips/
├── 01_Inbox/                     # 📥 临时存放区
│   └── (新剪藏的文章在这里等待分类)
│
├── 02_Library/                   # 📚 Raw Data 层（原始文章完整保留）
│   ├── ADK_Agent_Skills/         # 按分类的子目录
│   ├── AI_IDE_And_CLI/
│   ├── Agent_Architecture/
│   ├── Agent_Course/
│   ├── Claude_Code_Skills/
│   ├── Life_Strategy/
│   ├── NotebookLM_Workflows/
│   └── INDEX.md                  # 原始文章清单（由 /organize-webclips 维护）
│
├── 03_Wiki/                      # 🧠 LLM 编译的知识 Wiki
│   ├── _index.md                 # Wiki 主索引（由 /compile-wiki 维护）
│   ├── _glossary.md              # 术语表（未来扩展）
│   ├── concepts/                 # 概念文章
│   ├── connections/              # 跨概念关联文章
│   └── questions/                # Q&A 问答记录（知识回流）
│
├── 04_Output/                    # 📤 生成的输出产物
│   ├── summaries/                # 研究报告
│   ├── slides/                   # Marp 幻灯片
│   └── briefs/                   # 项目简报
│
├── .agents/workflows/            # 🤖 工作流定义
│   ├── organize-webclips.md      # Capture + Organize
│   ├── compile-wiki.md           # Distill (Wiki 编译)
│   ├── query-wiki.md             # Express (Q&A + 输出)
│   └── lint-wiki.md              # Linting (健康检查)
│
├── .tools/                       # 🔧 辅助工具
│   └── convert_md_to_pdf.py      # MD → PDF 转换
│
├── config/                       # ⚙️ 配置
│   └── frontmatter-template.md   # Frontmatter 标准模板
│
└── start.sh                      # 一键 PDF 转换脚本
```

### 设计原则
1. **Raw Data 不可变**：`02_Library/` 中的原始文章保持原样，不做内容修改（仅补全 frontmatter）
2. **Wiki 是编译产物**：`03_Wiki/` 全部由 LLM 生成和维护，用户不直接编辑
3. **输出可追溯**：`04_Output/` 中每个文件都通过 frontmatter 的 `sources_consulted` 回链到来源
4. **索引即入口**：`INDEX.md` 和 `_index.md` 是知识库的"目录页"，LLM 通过它们快速定位资料

---

## 3. 工作流设计详解

### 3.1 `/organize-webclips`（Capture + Organize）

**职责**：将 `01_Inbox/` 中的新文章分类、标准化、归档到 `02_Library/`

**步骤流**：
```
1. 扫描 01_Inbox/ 中未分类的 .md 文件
2. 读取内容，归入 7+ 个分类之一
3. 标准化 frontmatter（title, source, clipped_at, category, tags, status, compiled）
4. 跨目录查重
5. 输出计划表（含核心洞察列），请求确认
6. 执行重命名/移动 + 更新 INDEX.md
7. 提示后续操作（/compile-wiki, PDF 转换, NotebookLM）
```

**关键设计决策**：
- **分类体系可自进化**：当出现不属于现有分类的文章时，LLM 提议新分类，用户确认后自动更新工作流文件
- **Frontmatter 标准化在归档时完成**：确保所有进入 Library 的文章都有统一的元数据格式
- **"核心洞察"列**：在分类确认时就让用户感知文章价值，参考 BASB 的"渐进式摘要"理念

### 3.2 `/compile-wiki`（Distill）

**职责**：从 `02_Library/` 原始文章中提取概念，编译为 `03_Wiki/` 的结构化知识 Wiki

**步骤流**：
```
1. 扫描 02_Library/ 中 compiled: false 的文章
2. 深度阅读 → 提取 3-5 个核心概念 → 判断新建/合并
3. 输出编译计划表，请求确认
4. 执行编译：新建概念文章 / 合并到已有文章 / 生成关联文章
5. 更新 03_Wiki/_index.md 和 02_Library/INDEX.md
6. 输出编译报告
```

**关键设计决策**：
- **概念粒度**：一个概念文章聚焦一个可独立理解的知识点，而非一篇文章的摘要
- **多源综合**：当多篇原始文章谈论同一概念时，概念文章需综合所有来源，而非简单罗列
- **双向链接**：Wiki 文章通过 `sources` 回链到原始文章，原始文章通过 `compiled` 标记连接到 Wiki
- **增量编译**：每次只处理新增的未编译文章，不重新编译全部

### 3.3 `/query-wiki`（Express）

**职责**：对知识库进行研究式问答，生成各种格式的输出

**步骤流**：
```
1. 理解问题 → 制定研究计划
2. 检索 Wiki 概念 → 不足时回溯到 Raw Data → 最后手段外部搜索
3. 多源综合 → 标注来源
4. 选择输出格式（文本/报告/幻灯片） → 存入 04_Output/
5. 可选：知识回流到 03_Wiki/questions/
```

**关键设计决策**：
- **三层检索优先级**：Wiki → Raw Data → Web Search
- **输出回流**：Q&A 结果可以存回 Wiki，形成知识的正向循环——这是 Karpathy 方法论的精华
- **格式多样化**：支持 Markdown 报告、Marp 幻灯片、简报等多种输出

### 3.4 `/lint-wiki`（Linting）

**职责**：定期对知识库进行健康检查，发现数据问题和增长机会

**检查维度**：
```
1. 覆盖率：多少原始文章尚未编译？
2. 一致性：引用是否有效？术语是否统一？
3. 完整性：概念文章结构是否完整？
4. 关联发现：哪些概念可能相关但未建立链接？
5. 时效性：哪些内容已过时？
```

**关键设计决策**：
- **评分机制**：给知识库一个 0-10 的健康评分，直观感知整体状态
- **可操作建议**：报告中的每个发现都附带具体的建议操作（如"运行 /compile-wiki"）
- **交互式修复**：用户可以选择当场修复某些问题

---

## 4. 元数据系统

### 4.1 Frontmatter 标准

参见 `config/frontmatter-template.md`。核心字段：

| 字段 | 作用 | 维护者 |
|:----:|:----:|:------:|
| `title` | 文章标题 | /organize-webclips |
| `source` | 原文 URL | /organize-webclips |
| `clipped_at` | 剪藏日期 | /organize-webclips |
| `category` | 主分类 | /organize-webclips |
| `tags` | 关键词标签 | /organize-webclips |
| `status` | 知识管理状态 | 各工作流流转 |
| `compiled` | 是否已编译到 Wiki | /compile-wiki |

### 4.2 状态流转

```
            /organize-webclips          /compile-wiki           /query-wiki
新文章 ─────────→ raw ─────────→ distilled ─────────→ expressed
                  │
                  ├── highlighted  (未来扩展：手动高亮关键段落)
                  │
                  └── archived     (未来扩展：归档不再活跃的文章)
```

---

## 5. 分类体系

### 5.1 当前分类

| # | 标签 | 适用范围 | 创建时间 |
|---|:----:|:---------|:--------:|
| 1 | `[ADK_Agent_Skills]` | Google ADK 框架、Agent Skills 规范、技能设计模式 | 初始 |
| 2 | `[Claude_Code_Skills]` | Claude Code 技能设计、Prompt 优化、团队分发 | 初始 |
| 3 | `[Agent_Architecture]` | Agent 架构评估、Harness 设计、上下文策略 | 初始 |
| 4 | `[NotebookLM_Workflows]` | NotebookLM、MCP 集成、BASB 知识管理 | 初始 |
| 5 | `[AI_IDE_And_CLI]` | Antigravity、Gemini CLI、安全配置 | 初始 |
| 6 | `[Agent_Course]` | AI Agent 系统性课程、全栈构建指南 | 初始 |
| 7 | `[Life_Strategy]` | 个人成长、行为心理学、生产力哲学 | 初始 |
| 8 | `[AI_Prompt_Engineering]` | LLM Prompt 设计原则、上下文管理策略、Token 使用优化 | 2026-04-07 |

### 5.2 扩展机制
- 当 `/organize-webclips` 遇到不属于现有分类的文章时，会提议新分类
- 用户确认后，新分类自动追加到工作流的 Step 2 列表中
- 同时自动同步到本文档的"当前分类"表（Section 5.1）和变更日志（Section 7）

---

## 6. 静态网站

知识库通过 VitePress 生成静态网站，便于浏览器访问和团队分享。

### 6.1 技术栈
- **VitePress 1.6+**：Markdown → HTML 静态站点生成器
- **sync-docs.mjs**：内容同步脚本，将 Library/Wiki/Output 复制到 `docs/` 并自动生成首页、侧边栏

### 6.2 命令
| 命令 | 说明 |
|------|------|
| `npm run docs:sync` | 仅同步内容（不启动服务器） |
| `npm run docs:dev` | 同步 + 启动开发服务器（http://localhost:5173） |
| `npm run docs:build` | 同步 + 构建静态 HTML（产物在 `docs/.vitepress/dist/`） |
| `npm run docs:preview` | 预览已构建的静态站点 |

### 6.3 目录结构
```
docs/
├── .vitepress/
│   ├── config.mts          # VitePress 配置
│   ├── sidebar.json        # 自动生成的侧边栏配置
│   └── dist/               # 构建产物（.gitignore）
├── index.md                # 首页（自动生成）
├── wiki/                   # ← 03_Wiki/ 内容
├── library/                # ← 02_Library/ 内容
└── output/                 # ← 04_Output/ 内容
```

### 6.4 工作流集成
- `/organize-webclips` 和 `/compile-wiki` 完成后，后续操作中提示运行 `npm run docs:build`
- 内容同步脚本会自动处理文件名中的方括号前缀（VitePress 兼容性）

---

## 7. 未来扩展方向

### 7.1 短期（1-3 个月）
- [ ] `_glossary.md` 术语表：由 /compile-wiki 自动维护常见术语定义
- [ ] Obsidian 兼容：概念文章中使用 `[[双链]]` 语法，支持 Obsidian 图谱视图
- [ ] Marp 幻灯片模板：标准化幻灯片生成格式

### 7.2 中期（3-6 个月）
- [x] ~~全文搜索引擎~~：已通过 VitePress 内置搜索实现 ✅
- [ ] 自动采集管线：Readwise / Obsidian Web Clipper 自动同步到 01_Inbox/
- [ ] PARA 行动力维度：为文章/概念增加 Active/Resource/Archive 标记
- [ ] GitHub Pages 部署：自动 CI/CD 发布知识库网站

### 7.3 长期（6+ 个月）
- [ ] 合成数据 + 微调：让 LLM "知道" Wiki 中的知识（Karpathy 的远期愿景）
- [ ] 多人协作：共享 Wiki 编辑权限
- [ ] 主题关联图：基于 tags 交叉引用生成 Mermaid 可视化

---

## 8. 变更日志

| 日期 | 变更内容 | 关联工作流 |
|:----:|:---------|:---------:|
| 2026-04-04 | 初始架构设计：融合 BASB CODE + Karpathy 方法论 | 全部 |
| 2026-04-04 | 新增 03_Wiki/ 和 04_Output/ 目录 | /compile-wiki, /query-wiki |
| 2026-04-04 | 重写 /organize-webclips：增加 frontmatter 标准化、核心洞察列、INDEX.md 维护 | /organize-webclips |
| 2026-04-04 | 新建 /compile-wiki、/query-wiki、/lint-wiki 三个工作流 | 各自 |
| 2026-04-04 | 创建 config/frontmatter-template.md 标准模板 | /organize-webclips |
| 2026-04-04 | 生成 02_Library/INDEX.md 和 03_Wiki/_index.md | /organize-webclips, /compile-wiki |
| 2026-04-07 | 新增分类 [AI_Prompt_Engineering]；入库 7 篇新文章 | /organize-webclips |
| 2026-04-07 | P0: 新增 03_Wiki/_log.md 操作日志；4 个工作流增加自动日志追加步骤 | 全部 |
| 2026-04-07 | P1: /compile-wiki 增加 Step 4.4 交叉回扫（Cross-Scan）环节 | /compile-wiki |
| 2026-04-07 | P2: /query-wiki Step 5 Q&A 回流从"可选"改为"推荐默认" | /query-wiki |
| 2026-04-07 | P3: /organize-webclips 增加 ARCHITECTURE.md 联动自动更新 | /organize-webclips |
| 2026-04-07 | 新增 VitePress 静态网站：docs/ 目录、sync-docs.mjs、config.mts | 全部 |


