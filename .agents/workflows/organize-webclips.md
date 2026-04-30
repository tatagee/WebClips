---
description: 自动分析并整理 WebClips 目录下的新文章，按照核心主题进行归类、元数据标准化和重命名。
---

# WebClips 自动化整理与分类工作流

你现在扮演一位专属的 **WebClips 知识库管理员**。你的任务是帮我找出尚未分类的 Markdown 文件，分析其内容，标准化元数据，并按既定的核心主题进行重命名和归档。

> **设计理念**：本工作流对应 BASB CODE 方法论中的 **Capture → Organize** 环节。
> 文章经本工作流处理后进入 `02_Library/`（Raw Data 层），后续可通过 `/compile-wiki` 编译到 `03_Wiki/`。

请严格按照以下步骤执行：

---

## Step 1: 扫描未分类文件

使用 `run_command` 或 `list_dir` 工具，列出 `01_Inbox/`（收件箱）目录下所有以 `.md` 结尾，**且文件名不包含 `[` 符号**的文件。同时排除 `README.md` 等特殊系统文件。

如果没有找到新文件，请告诉我"当前收件箱 (01_Inbox) 中没有需要整理的新文章"，并终止工作流。

---

## Step 2: 内容分析与归类

针对在 Step 1 中找到的每一个未分类文件，使用 `view_file` 工具读取其前 100 行（或足够判断主题的内容）。

根据内容，将其**严格归入**以下分类之一。如果内容横跨多个分类，请选择最核心的一个：

1. **[ADK_Agent_Skills]**: 涉及 Google ADK 框架、Agent Skills 规范、技能设计模式、上下文渐进式披露等。
2. **[Claude_Code_Skills]**: 涉及 Anthropic Claude Code 技能设计、自动化 Prompt 优化、团队分发与部署。
3. **[Agent_Architecture]**: 涉及 Agent 底层架构评估（如 AGENTS.md）、长生命周期应用设计 (Harness)、主动检索 vs 被动上下文。
4. **[NotebookLM_Workflows]**: 涉及 NotebookLM 学习工作流、MCP 集成、Second Brain (BASB) 个人知识管理方法论。
5. **[AI_IDE_And_CLI]**: 涉及 Antigravity IDE、Gemini CLI 的入门、实战演练、安全配置及 PDF 解析等。
6. **[Agent_Course]**: 涉及 AI Agent 相关的系统性长篇教程、课程体系、全栈构建指南。
7. **[Life_Strategy]**: 涉及个人成长、行为心理学、长期目标设定、生产力哲学及生命系统设计。
8. **[AI_Prompt_Engineering]**: 涉及大语言模型（LLM）的 Prompt 设计原则、上下文管理策略及成本与 Token 使用优化。

*⚠️ 动态扩展机制：如果文章内容不属于以上任何预设分类，请为其拟定一个全新的分类标签（格式如 `[NEW_TOPIC_NAME]`），并为其撰写一句话分类描述，然后在 Step 5 的表格中明确标示为【拟新增分类】。*

---

## Step 3: 元数据标准化（Frontmatter Enrichment）

> 参考标准：`config/frontmatter-template.md`

对每篇文章检查并补全以下标准 YAML frontmatter 字段：

| 字段 | 来源 | 说明 |
|:----:|:----:|:-----|
| `title` | 保留已有 / 从内容提取 | 文章标题 |
| `source` | 保留已有 / 标记为 `unknown` | 原文 URL |
| `clipped_at` | 取文件创建日期 | 剪藏日期（ISO 格式） |
| `category` | 由 Step 2 确定 | 主分类标签 |
| `tags` | LLM 从内容提取 | 3-5 个关键词 |
| `status` | 固定初始值 `raw` | 知识管理状态 |
| `compiled` | 固定初始值 `false` | 是否已编译到 Wiki |

**规则**：
- 如果文章已有 `title` 和 `source` 字段，保留不动
- 缺失的字段在执行阶段（Step 6）统一补写
- `tags` 使用英文小写，多词用连字符（如 `agent-skills`, `progressive-disclosure`）

---

## Step 4: 跨目录查重（Anti-Duplicate Check）

在移动前，检查 `02_Library/` 下所有相关分类子文件夹中是否已存在同名（或高度相似名）的文件。
- 如果发现完全重复，请在 Step 5 的计划表中将其标记为 `[REPEATED]`，并默认建议用户跳过（Skip）。
- 如果文件名相似但内容不同，请提示用户是否需要进行覆盖或重命名。

---

## Step 5: 制定整理计划并请求确认

在执行任何修改之前，向用户输出一个表格，展示你的整理计划。表格需包含：

| 原文件名 | 分类标签 | 拟修改的新文件名 | 分类理由 | 💡 核心洞察 | Tags |
|----------|---------|----------------|---------|------------|------|
| example.md | [Agent_Architecture] | [Agent_Architecture] example.md | 涉及 Harness 设计 | Agent 需要... | `harness`, `long-running` |

**核心洞察**：用一句话概括这篇文章最有价值的观点或信息，这将帮助用户快速判断文章价值。

**必须在这一步停下来，询问用户："以上分类是否准确？是否可以开始执行？"**

---

## Step 6: 执行操作与规则自进化 (Self-Updating)

等待用户确认后，执行以下连串操作：

### 6.1 工作流自进化
如果有【拟新增分类】被用户批准，你 **首先** 必须使用 `replace_file_content` 等文件编辑工具，将新分类及描述永久追加到本工作流文件 (`.agents/workflows/organize-webclips.md`) 的 "Step 2" 列表中。

### 6.2 Frontmatter 补全
对每个文件，使用文件编辑工具在文件头部写入/补全标准 frontmatter（参见 Step 3 中确定的字段值）。

### 6.3 执行重命名与移动
使用 `run_command` 工具批量执行 `mv` 命令。对每一个文件执行两步操作：
- 将原文件名加上分类前缀：`[分类标签] 原文件名.md`
- 将其从 `01_Inbox/` 移动到 `02_Library/[分类标签]/` 对应的子文件夹中（如果该分类文件夹不存在，需先 `mkdir -p` 创建）。



### 6.4 更新 Library 索引
读取 `02_Library/INDEX.md`（如果存在），将本次新入库的文章追加到对应分类的文章清单中。如果 `INDEX.md` 不存在，则从头生成。INDEX.md 格式参见下方"INDEX.md 格式规范"。

### 6.5 追加操作日志
使用文件编辑工具，向 `03_Wiki/_log.md` **末尾追加**一条日志条目。格式：

```markdown
## [YYYY-MM-DD] organize | X 篇文章入库
- 新增分类: (如有)
- 入库文章:
  - [分类] 文章标题 1
  - [分类] 文章标题 2
```

**注意**：这是 append-only 操作，不要修改已有的日志条目。

### 6.6 同步 ARCHITECTURE.md（如有新分类）
如果本次有新分类被用户批准，除了在 6.1 中更新工作流文件外，还需要：
1. 在 `ARCHITECTURE.md` 的 **Section 5.1 "当前分类"** 表格末尾追加新分类行
2. 在 `ARCHITECTURE.md` 的 **Section 7 "变更日志"** 表格末尾追加一条变更记录

---

## Step 7: 自动构建与同步产物

为了保证你刚才新处理好的分类文章立刻反映在客户端上，请使用 `run_command` 工具运行以下构建指令：

// turbo
```bash
export PATH=/opt/homebrew/bin:$PATH && npm run vault:build && npm run docs:build
```

---

## Step 8: 收尾与后续指引

重命名全部成功并且同步完成后，输出成功提示，并提供后续操作建议：

```
✅ 分类整理及构建同步已完成！本次处理了 X 篇文章。

📋 后续可选操作：
1. 如果有重要的核心文章，可立即运行 `/compile-wiki` 提取概念
2. 将新文章导入 NotebookLM → 生成音频播客摘要进行深度学习
```

---

## 附录：INDEX.md 格式规范

`02_Library/INDEX.md` 由本工作流自动维护，格式如下：

```markdown
# 📚 WebClips Raw Library Index
> 自动生成 by /organize-webclips | 最后更新: {{date}} | 共 {{count}} 篇

## 按分类统计
| 分类 | 篇数 | 已编译到 Wiki |
|------|:----:|:------------:|
| ADK_Agent_Skills | 6 | 0 |
| Agent_Architecture | 3 | 0 |

## 文章清单

### [ADK_Agent_Skills]
| # | 标题 | 来源 | 剪藏日期 | Status | Compiled |
|---|------|------|----------|:------:|:--------:|
| 1 | 5 Agent Skill Design Patterns | Google Blog | 2026-03 | raw | ❌ |

### [Agent_Architecture]
...
```
