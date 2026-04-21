---
description: 将 02_Library/ 中的原始文章编译为结构化的知识 Wiki，提取概念、建立关联、维护索引。
---

# Wiki 知识编译工作流

你是一台 **知识编译器 (Knowledge Compiler)**。你的任务是读取 `02_Library/` 中的原始文章，将其中的关键概念、模式和洞察提炼为结构化的 Wiki 文章，存放到 `03_Wiki/`。

> **设计理念**：本工作流对应 BASB CODE 方法论中的 **Distill（提炼）** 环节，
> 同时实现了 Karpathy LLM Knowledge Base 中 "Compile Wiki" 的核心流程。
> `02_Library/` 是 raw data（原始文章完整保留），`03_Wiki/` 是你的编译产物。
> **Wiki 由你维护，用户几乎不直接编辑它。**

请严格按照以下步骤执行：

---

## Step 1: 扫描待编译文章

读取 `02_Library/INDEX.md`，找出所有 `compiled` 标记为 `❌` 或 `false` 的文章。
如果 `INDEX.md` 不存在，则扫描 `02_Library/` 下所有 `.md` 文件的 frontmatter。

如果没有找到待编译的文章，请告诉用户："所有文章均已编译到 Wiki，当前没有新内容需要处理。" 并终止工作流。

否则，列出待编译文章清单，询问用户：
- "以下 X 篇文章尚未编译到 Wiki。要全部编译，还是选择部分？"

---

## Step 2: 深度阅读与概念提取

对每篇待编译文章：

1. **深度阅读**：使用 `view_file` 读取全文内容
2. **概念提取**：从文章中提取 3-5 个核心概念/模式/方法论。每个概念需要：
   - 概念名称（英文小写连字符，如 `progressive-disclosure`）
   - 概念中文名
   - 一句话定义
3. **关联判断**：对每个提取的概念，检查 `03_Wiki/concepts/` 中是否已有对应文章：
   - 文件名匹配 **或** 概念 aliases 匹配 → 标记为「📝 合并」
   - 没有匹配 → 标记为「🆕 新建」

---

## Step 3: 编译计划确认

输出编译计划表，**必须等待用户确认**：

| 源文章 | 提取的概念 | Wiki 操作 | 概念定义 |
|--------|-----------|:---------:|---------|
| Effective harnesses... | `agent-harness-pattern` Agent Harness 模式 | 🆕 新建 | 长期运行 Agent 的容错与恢复框架 |
| AGENTS.md outperforms... | `skills-vs-agents-md` Skills vs AGENTS.md | 🆕 新建 | 两种 Agent 指令注入方式的对比评估 |
| AGENTS.md outperforms... | `agent-harness-pattern` Agent Harness 模式 | 📝 合并 | （补充 Vercel 的评估数据） |

**询问用户**："以上编译计划是否合理？是否可以开始编译？"

---

## Step 4: 执行编译

### 4.1 新建概念文章

在 `03_Wiki/concepts/` 下创建新的 `.md` 文件，格式如下：

```markdown
---
concept: "概念中文名"
concept_id: "concept-english-id"
aliases: ["别名1", "别名2"]
sources:
  - "02_Library/分类/[分类] 文章名.md"
related_concepts:
  - "[[other-concept-id]]"
created_at: "{{今天日期}}"
last_compiled: "{{今天日期}}"
---

# 概念中文名 (Concept English Name)

## 定义
一段精准的概念定义（2-3 句话），综合所有来源文章的描述。

## 核心要点
- **要点 1**：具体描述。（来源：[[源文章标题]]）
- **要点 2**：具体描述。
- **要点 3**：具体描述。

## 实践指南
基于多篇源文章综合提炼的实操建议。什么场景下应该用？怎么用？有什么注意事项？

## 关联概念
- [[related-concept-1]] — 与本概念的关系说明
- [[related-concept-2]] — 与本概念的关系说明

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[源文章1]] | "原文引用..." |
| [[源文章2]] | "原文引用..." |
```

### 4.2 合并到已有文章

如果概念文章已存在：
1. 读取现有 Wiki 文章
2. 将新来源添加到 `sources` 列表
3. 将新的要点、实践建议追加到对应章节
4. 更新 `last_compiled` 日期
5. **不要覆盖已有内容，只追加新信息**

### 4.3 关联文章生成

如果在编译过程中发现两个概念之间存在有趣的对比、互补或矛盾关系：
- 在 `03_Wiki/connections/` 下创建关联文章
- 文件名格式：`conceptA-vs-conceptB.md` 或 `conceptA-and-conceptB.md`
- 内容聚焦于两者的对比分析

### 4.4 交叉回扫（Cross-Scan）

编译完所有新概念后，回扫 `03_Wiki/concepts/` 中的 **所有已有概念文章**：

1. **新证据匹配**：新的源文章是否为已有概念提供了新的视角、证据或案例？
2. **关联发现**：新概念与已有概念之间是否存在未建立的 connection？
3. **Related 更新**：已有概念文章的 `related_concepts` 是否需要补充新条目？

产出一个"回扫建议列表"。对于每个建议：
- 标明要更新的已有概念文件名
- 简述要补充的内容（1-2 句话）
- 用户确认后执行更新

> **设计理念**：来自 Karpathy 原文 - "A single source might touch 10-15 wiki pages." 交叉回扫确保每篇新文章的知识被充分吸收到整个 Wiki 网络中，而不只是创建孤立的新概念。

---

## Step 5: 更新索引与状态

### 5.1 更新 Wiki 主索引
创建或更新 `03_Wiki/_index.md`：

```markdown
# 🧠 WebClips Knowledge Wiki
> LLM 编译的知识库 | 最后编译: {{date}} | 共 {{count}} 个概念

## 概念目录

### 按分类

#### Agent & Skills
| 概念 | 文件 | 来源数 | 最后编译 |
|------|------|:------:|---------|
| Agent Harness 模式 | [[agent-harness-pattern]] | 2 | 2026-04-04 |
| Skills vs AGENTS.md | [[skills-vs-agents-md]] | 1 | 2026-04-04 |

#### IDE & Tooling
...

### 关联文章
| 关联 | 文件 | 说明 |
|------|------|------|
| Skills vs AGENTS.md | [[skills-vs-agents-md]] | 直接指令 vs 封装技能的效果对比 |

## 快速统计
- 总概念数: X
- 总关联文章: Y
- 覆盖原始文章: Z / {{total_raw}}
```

### 5.2 更新 Library 状态
对每篇已编译的源文章，更新其 frontmatter：
- `status`: `raw` → `distilled`
- `compiled`: `false` → `true`

同时更新 `02_Library/INDEX.md` 中对应行的 Compiled 标记。

### 5.3 追加操作日志
使用文件编辑工具，向 `03_Wiki/_log.md` **末尾追加**一条日志条目。格式：

```markdown
## [YYYY-MM-DD] compile | X 篇源文章 → Y 个新概念
- 新建概念: concept-a, concept-b, ...
- 合并更新: concept-c (+N 来源)
- 交叉回扫: 更新了 Z 个已有概念
- 新建关联: connection-name (如有)
```

**注意**：这是 append-only 操作，不要修改已有的日志条目。

---

## Step 6: 自动构建与同步产物

概念编译结束并生成索引后，需要把变更发布出去。接下来，请务必使用 `run_command` 工具运行以下构建指令：

// turbo
```bash
export PATH=/opt/homebrew/bin:$PATH && npm run vault:build && npm run docs:build
```

---

## Step 7: 编译报告与后续指引

输出编译报告：

```
✅ 【Compile Wiki 工作流已完成】

知识库及产物已全部更新就绪，包含 X 篇新概念和 Y 个新关联。

后续建议：
1. 浏览 03_Wiki/ 确认文本内容无误
2. 在 Obsidian 中打开 03_Wiki/_index.md → 浏览完整知识图谱
```

---

## 附录：编译原则

1. **概念粒度**：一个概念文章应聚焦于一个可独立理解的知识点。太宏观（如"人工智能"）或太微观（如"某个函数参数"）都不合适。
2. **多源综合**：当多篇文章谈论同一概念时，概念文章应综合所有来源，而不是简单罗列。
3. **实践导向**：每个概念文章都应包含"实践指南"部分，回答"这对我有什么用？"。
4. **保持回链**：Wiki 文章必须通过 `sources` 字段回链到原始文章，确保可溯源。
5. **LLM 维护**：Wiki 内容由 LLM 生成和维护，用户一般不直接编辑。如需修正，优先通过再次运行 `/compile-wiki` 来更新。
