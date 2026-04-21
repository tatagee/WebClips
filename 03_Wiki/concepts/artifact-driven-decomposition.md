---
concept: "产物驱动的任务拆解"
concept_id: "artifact-driven-decomposition"
aliases: []
sources:
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] Run multiple agents at once with _fleet in Copilot CLI.md"
related_concepts:
  - "[[multi-agent-orchestrator]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 产物驱动的任务拆解 (Artifact-Driven Decomposition)

## 定义
在向支持多 Agent 并发处理的引擎派发指令时，把指令意图从“抽象动作”重构为“具体的特定产物要求（特定文件/文档/报告）”，以方便中心调配器正确并行派发和验证。

## 核心要点
- **将过程描述转换为结构化交付标准**：给出的目标指令需精确挂靠到“产生什么文件”。（来源：[[[AI_IDE_And_CLI] Run multiple agents at once...]]）
- **强行隔离上下文污染**：由于模型能够提前知晓不同的交付件不共享上下文节点，它能在初期规划出最佳的独立子流向，减少“串行化执行”。

## 实践指南
**错误 Prompt**：“帮我建立此系统的说明指导”
**正确 Prompt**：“创建 /docs/auth.md 包括令牌控制逻辑、创建 /docs/api_list.md 具体接口清单。在并行任务都结束后，再依赖生成汇总索引 /docs/index.md”。为各个物理层面的文档圈定互不干涉的安全区是最关键的。

## 关联概念
- [[multi-agent-orchestrator]] — 此方式极度契合并并发机制，因为明确目标边界是触发 Orchestrator 安全下发子节点的大前提。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[[AI_IDE_And_CLI] Run multiple agents at once...]] | "A good way to do that is being specific about deliverables. Map every work item to a concrete artifact like a file, a test suite, or a section of documentation... The second prompt gives the orchestrator four distinct deliverables, three of which can run in parallel, and one that depends on them." |
