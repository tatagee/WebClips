---
concept: "多 Agent 编排模式"
concept_id: "multi-agent-orchestrator"
aliases: ["Orchestrator-subagent 模式", "Sub-agent 分发"]
sources:
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] Run multiple agents at once with _fleet in Copilot CLI.md"
  - "02_Library/Agent_Architecture/[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md"
related_concepts:
  - "[[agent-teams-pattern]]"
  - "[[message-bus-pattern]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 多 Agent 编排模式 (Multi-Agent Orchestrator)

## 定义
中心化的任务拆解架构。主（Orchestrator）Agent 负责将复杂请求解耦为子模块并识别依赖性，继而并发地分发给多个临时生命周期的子（Sub-Agent）完成各自单一指令，最终由主脑合并产物。

## 核心要点
- **中心单点依赖**：所有信息路由和聚合依赖于控制中心（Lead Agent）。非常易于控制输出质量且过程可控（来源：[[[Agent_Architecture] Multi-agent coordination patterns_...]]）
- **独立环境无文件锁**：多个并发的 Agent 不存在底层文件操作锁，分配任务时若操作相同文件会导致被覆盖（来源：[[[AI_IDE_And_CLI] Run multiple agents at once...]]）
- **临时且聚焦的上下文**：Sub-Agent 不需要保留多次迭代的大长文历史，它们只需快速解决当前独立子分支，然后消亡。

## 实践指南
**适用场景**：任务步骤确定、输出件边界极其清晰的任务（如代码 Review 各阶段分发、特定文档区块补全）。
**避坑指南**：向 Sub Agent 下发工作项时，需要在 Prompt 内严格界定边界和互斥目标路径以防止互相交叉覆盖文件。

## 关联概念
- [[artifact-driven-decomposition]] — 为 Orchestrator 提供精确拆解指令的具体技术。
- [[agent-teams-pattern]] — 当需要 Agent 在跨周期内保存长时知识或连续多步骤交互时，应放弃编排模式转为团队模式。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[[Agent_Architecture] Multi-agent coordination patterns_...]] | "A lead agent receives a task and determines how to approach it... Subagents complete their work and return results, which the orchestrator synthesizes into a final output." |
