# 编排器与子 Agent 模式 (Orchestrator-Subagent Pattern)

## 核心定义
一种将复杂任务拆解并分发给专业子 Agent 处理的多体架构模式。主编排器 (Orchestrator) 负责理解用户意图、规划步骤并分派任务，而子 Agent (Subagent) 负责在特定领域内执行任务并返回结果。

## 与单一 Agent 的区别
- **状态解耦**: 编排器不需要保留子 Agent 执行时的详尽局部状态，只关心输入输出，降低了上下文溢出风险。
- **专职专能**: 子 Agent 可以配备不同的系统指令 (System Prompt) 和工具集，甚至使用较小、更快、更便宜的模型。
- **并行执行**: 对于互不依赖的子任务，编排器可以同时唤起多个子 Agent，极大缩短执行时间。

## 适用场景
- 复杂代码重构。
- 多步骤的深度研究 (Deep Research)。
- 需要多源数据合并的分析任务。

## 关联概念
- [[multi-agent-orchestrator]]
- [[hermes-agent-framework]]
- [[durable-agent-primitives]]
