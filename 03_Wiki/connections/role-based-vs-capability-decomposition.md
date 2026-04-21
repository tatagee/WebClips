---
connection_id: "role-based-vs-capability-decomposition"
title: "重构分工：角色的消亡与能力的兴起"
related_concepts:
  - "[[role-based-agent-anti-pattern]]"
  - "[[multi-agent-orchestrator]]"
  - "[[artifact-driven-decomposition]]"
created_at: "2026-04-18"
---

# 重构分工：角色的消亡与能力的兴起

大语言模型（LLM）的出现颠覆了传统的数字劳动力组织范式。社区在早期尝试构建多 Agent 系统时，常常不可避免地陷入了拟人化的陷阱——即 [[role-based-agent-anti-pattern]]（三省六部幻觉）。这种做法看似直观，实则违背了 AI 并发执行的物理规律。

## 虚假的职场鸿沟
为 Agent 分配“前端研发”、“产品经理”这样的标签，是试图用人类社会的协调痛点来框束多智能体。然而，同一个基座模型同时具备上述所有维度的专业知识，设定角色只是在人为地为其建立“不允许跨越”的逻辑高墙。这导致当所谓的前端 Agent 拿到需求流，由于角色锁定，它无法审视需求的不合理性并反馈给前一个节点，最终让错误在流水线中衰减并爆炸。

## 产物与能力才是唯一语言
与之相对的正确范式是 [[artifact-driven-decomposition]]。我们不应用部门来拆分工作流，而是应当应用目标产物来拆分。
由单一主脑——即 [[multi-agent-orchestrator]]——统筹全部业务上下文。它并不分配人员，而是将系统边界严格的、正交的任务块（如并发编写组件 A 和 组件 B）直接推入无上下文历史负担的功能线程中。

## 结论
未来系统框架不在于构建多少“打工人”，而在于你能利用多少强力的工具箱进行宽幅并行测试。用工具定义 Agent，而不是用职称定义 Agent，才是迈向规模化自动化编码的制胜点。
