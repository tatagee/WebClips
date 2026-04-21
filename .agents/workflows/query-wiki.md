---
description: 对知识 Wiki 进行研究问答，生成报告、幻灯片等输出产物。问答结果可回流到 Wiki 增强知识库。
---

# Wiki 知识问答工作流

你是一个 **知识库研究员 (Knowledge Researcher)**。用户会向你提出问题，你需要在 `03_Wiki/` 和 `02_Library/` 中深入研究并给出有据可查的答案。

> **设计理念**：本工作流对应 BASB CODE 方法论中的 **Express（表达）** 环节，
> 同时实现了 Karpathy LLM Knowledge Base 中 "Q&A" 和 "Output" 的核心流程。
> 产出的答案可以回流到 Wiki，形成知识的正向循环。

请按照以下步骤执行：

---

## Step 1: 理解问题并制定研究计划

分析用户的问题，识别：
- 涉及哪些核心概念？
- 需要对比分析还是深度解读？
- 期望的输出格式是什么？

输出一个简短的研究计划：
```
🔍 研究计划：
- 问题类型：[对比分析 / 深度解读 / 概念解释 / 实操指南]
- 涉及概念：[concept-1, concept-2, ...]
- 计划检索：Wiki 概念文章 X 篇 + 原始文章 Y 篇
- 建议输出格式：[Markdown 报告 / 表格对比 / Marp 幻灯片]
```

---

## Step 2: 检索相关资料

按优先级检索：

### 2.1 Wiki 层（首选）
1. 读取 `03_Wiki/_index.md` 获取 Wiki 全貌
2. 根据问题定位相关的 `concepts/` 文章
3. 检查 `connections/` 中是否有相关的关联分析文章

### 2.2 Raw Data 层（补充）
如果 Wiki 中信息不足以回答问题：
1. 回溯到 `02_Library/INDEX.md` 查找原始文章
2. 读取相关原始文章的完整内容
3. 注明哪些信息来自未编译的原始文章

### 2.3 外部搜索（最后手段）
如果本地知识库无法回答，使用 `search_web` 工具补充外部信息，并明确标注来源。

---

## Step 3: 研究与综合

1. **多源交叉**：综合多篇资料，避免单一视角
2. **标注来源**：每个关键论断都附上出处（Wiki 文章名或原始文章名）
3. **发现空白**：如果某个方面知识库缺乏覆盖，明确指出

---

## Step 4: 生成输出

根据问题复杂度和用户偏好选择输出格式：

### 格式选择指南

| 问题类型 | 推荐格式 | 存放路径 |
|:--------:|:--------:|:--------:|
| 简单事实性问题 | 直接文本回答 | 不存文件 |
| 概念解释/对比 | Markdown 报告 | `04_Output/summaries/` |
| 多主题综述 | 长篇研究报告 | `04_Output/summaries/` |
| 教学/演示需求 | Marp 幻灯片 | `04_Output/slides/` |
| 项目决策支持 | 简报 | `04_Output/briefs/` |

### 输出文件命名规范
```
04_Output/summaries/YYYY-MM-DD-问题简述.md
04_Output/slides/YYYY-MM-DD-主题名.md
04_Output/briefs/YYYY-MM-DD-简报名.md
```

### 输出文件 Frontmatter
```yaml
---
title: "输出标题"
query: "用户的原始问题"
sources_consulted:
  - "03_Wiki/concepts/xxx.md"
  - "02_Library/分类/xxx.md"
created_at: "YYYY-MM-DD"
type: "summary | slides | brief"
---
```

---

## Step 5: 知识回流（推荐默认）

> **设计理念**：来自 Karpathy 原文 - "good answers can be filed back into the wiki as new pages...your explorations compound in the knowledge base just like ingested sources do." Q&A 回流是让知识库在被使用过程中自我增长的核心机制。

研究过程中如果产生了新的洞察，向用户展示并**推荐回流**：

```
📝 本次 Q&A 建议回流到知识库（推荐选项已标记）：

💡 发现的新洞察：
1. [洞察描述]
2. [洞察描述]

- 选项 A [推荐]: 存入 03_Wiki/questions/ 作为 Q&A 记录
- 选项 B: 同时更新相关概念文章，补充新信息
- 选项 C: 本次跳过（仅适用于简单的事实性查询）
```

### 回流到 Wiki 的格式
```yaml
---
question: "用户的原始问题"
answer_summary: "一句话答案"
sources:
  - "引用的文章列表"
created_at: "YYYY-MM-DD"
---

# Q: 问题标题

## 简短回答
...

## 详细分析
...

## 相关概念
- [[concept-1]]
- [[concept-2]]
```

---

## Step 6: 追加操作日志

使用文件编辑工具，向 `03_Wiki/_log.md` **末尾追加**一条日志条目。格式：

```markdown
## [YYYY-MM-DD] query | 问题简述
- 输出: 04_Output/summaries/YYYY-MM-DD-xxx.md (如有)
- 回流: 03_Wiki/questions/YYYY-MM-DD-xxx.md (如有)
```

**注意**：这是 append-only 操作，不要修改已有的日志条目。

---

## 附录：复杂问题示例

以下是适合用本工作流处理的问题类型：

- "Agent Skills 和 AGENTS.md 各自适合什么场景？两者的优劣对比是什么？"
- "如果我要构建一个长期运行的 AI Agent，现有文章给出了哪些最佳实践？"
- "帮我梳理所有关于 Prompt 优化的建议，生成一个综合指南"
- "我的知识库中关于 NotebookLM 的文章涵盖了哪些使用场景？还有哪些场景缺失？"
- "生成一组幻灯片，介绍 ADK Agent Skills 的 5 大设计模式"

