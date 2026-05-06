---
title: "workflows-vs-agents"
concept: "Workflows vs Agents"
concept_id: "workflows-vs-agents"
aliases: ['工作流 vs 智能体', 'agentic-systems']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Building Effective AI Agents.md"
related_concepts:
  - "[[agentic-patterns]]"
  - "[[agent-harness-pattern]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Workflows vs Agents (工作流 vs 智能体)

## 核心定义
Anthropic 在其工程指南中，将所有此类系统统称为 **Agentic Systems (智能体系统)**，但针对架构设计做出了核心区分：

| 维度 | **Workflows (工作流)** | **Agents (智能体)** |
| :--- | :--- | :--- |
| **控制流** | 通过预定义的代码路径进行编排 (Hardcoded) | 由 LLM 动态引导操作过程与工具使用 |
| **决策权** | 逻辑逻辑在代码中，LLM 负责填充内容 | LLM 维持对如何完成任务的控制权 |
| **适用场景** | 目标明确、步骤固定的任务 (准确率高) | 需要灵活性、具备模型驱动决策规模的任务 |
| **复杂度** | 较低，易于调试和预测 | 较高，存在复合错误风险 |

## 架构选型原则
1. **简单优先**：寻找最简单的解决方案，仅在必要时增加复杂度。
2. **权衡延迟与成本**：Agentic Systems 通常用延迟和成本换取更好的任务表现。
3. **框架慎用**：建议从直接使用 LLM API 开始，理解底层 Prompt 和响应，避免被框架的抽象掩盖调试细节。

## 关键见解
> "Success in the LLM space isn't about building the most sophisticated system. It's about building the *right* system for your needs."

---
## 实践指南
- **架构评分决策 (Decision Score)**：
  - 如果任务是 100% 确定性的流程 -> **Workflow (100分)**。
  - 如果需要纠缠于模糊的自然语言指令 -> **Agent (100分)**。
  - 如果是 50/50 混合任务 -> 优先使用 **Modular Workflows**，仅在最模糊的节点调用微型 Agent。
- **故障隔离**：将 Agent 的决策层与 Workflow 的执行层物理分离。如果 Agent 下达了错误指令，Workflow 层的参数校验（Type-safe Schema）应能拦截非法的执行请求。

---
## 参考链接
- [[Agent_Architecture] Building Effective AI Agents](/library/Agent_Architecture/Agent_Architecture%20-%20Building%20Effective%20AI%20Agents)
