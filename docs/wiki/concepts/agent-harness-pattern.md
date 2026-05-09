---
title: "agent-harness-pattern"
concept: "Agent Harness 模式"
concept_id: "agent-harness-pattern"
aliases: ['harness', '长周期agent', 'agentic-systems']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Effective harnesses for long-running agents.md"
  - "02_Library/Agent_Architecture/[Agent_Architecture] Harness-design-for-long-running-application-development.md"
  - "02_Library/Agent_Architecture/[Agent_Architecture] Building Effective AI Agents.md"
related_concepts:
  - "[[workflows-vs-agents]]"
  - "[[agent-computer-interface]]"
created_at: "2026-04-04"
last_compiled: "2026-04-07"
---

# Agent Harness 模式

## 定义
长期运行 Agent 的容错、恢复框架及生命周期管理。本质上是将研发流程从“让 AI 协助人”重构为“人构建系统让 AI 输出可信工件”的过程。

## 核心设计准则 (Anthropic 2026)
1. **Simplicity (简洁性)**：保持 Agent 设计的简单，先由简单 Prompt 开始，必要时才引入多步 Agentic 系统。
2. **Transparency (透明性)**：通过显式展示 Agent 的规划步骤来提高可解释性。
3. **ACI 驱动**：通过深入的工具文档和测试，精心打磨 Agent-Computer Interface。

## 关键要点
- **Ground Truth 校验**：Agent 在每一步必须获取环境的真实反馈（如代码执行结果），以评估进度。
- **检查点 (Checkpointing)**：在遇到阻塞或到达关键节点时，允许 Agent 暂停并请求人类介入。
- **停止条件**：包含最大迭代次数等退出机制，防止死循环和成本失控。
- **统一的代码全库视图**：打破碎片化的 Repository，由于 AI 极难进行跨库的隐式推断，应强行转为 Monorepo 使得一切关系对 AI 显性化。（来源：[[Agent_Architecture] Why Your “AI-First” Strategy Is Probably Wrong.md](/library/Agent_Architecture/Agent_Architecture%20-%20Why%20Your%20%E2%80%9CAI-First%E2%80%9D%20Strategy%20Is%20Probably%20Wrong)）

## 实践指南
当开发需要持续数小时甚至数天的 Agent 任务时，不要写死大循环，而是利用 State Machine、Checkpoint 和 [agent-computer-interface](/wiki/concepts/agent-computer-interface) ACI 规范进行设计。构建任何自动化流程，都需要确保配套部署了对等的无缝验证机制（Testing Harness）。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[Agent_Architecture] Effective harnesses for long-running agents](/library/Agent_Architecture/Agent_Architecture%20-%20Effective%20harnesses%20for%20long-running%20agents) | "系统自动归档提炼的要点摘要..." |
| [[Agent_Architecture] Building Effective AI Agents](/library/Agent_Architecture/Agent_Architecture%20-%20Building%20Effective%20AI%20Agents) | "Maintain simplicity... Prioritize transparency... Carefully craft your ACI." |
| [[Agent_Architecture] Why Your “AI-First” Strategy Is Probably Wrong.md](/library/Agent_Architecture/Agent_Architecture%20-%20Why%20Your%20%E2%80%9CAI-First%E2%80%9D%20Strategy%20Is%20Probably%20Wrong) | "I had to unify all the code into a single monorepo. One reason: so AI could see everything... The more of your system you pull into a form the agent can inspect, validate, and modify, the more leverage you get." |

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[Agent_Architecture] Effective harnesses for long-running agents](/library/Agent_Architecture/Agent_Architecture%20-%20Effective%20harnesses%20for%20long-running%20agents) | "系统自动归档提炼的要点摘要..." |
| [[Agent_Architecture] Harness-design-for-long-running-application-development](/library/Agent_Architecture/Agent_Architecture%20-%20Harness-design-for-long-running-application-development) | "系统自动归档提炼的要点摘要..." |
