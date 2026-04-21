---
concept: "生成验证者模式"
concept_id: "generator-verifier-pattern"
aliases: []
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md"
related_concepts:
  - "[[narrow-scope-ai-review]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 生成验证者模式 (Generator-Verifier Pattern)

## 定义
在多 Agent 分工中，一类针对“高质量产出要求”的典型编排网络。包含一个内容生成 Agent（Generator）以及一个或多个专门负责拿固定标准审查结果并驳回的评判 Agent（Verifier）。

## 核心要点
- **对抗性校验**：质量控制的正确设计是让一个 Agent 专门找另一个 Agent 的问题，而不是“接力传递工作成果”。（来源：[[[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md]]）
- **客观的拒绝标准**：Verifier 需要被配置非常明确的准入规则，例如静态分析要求、测试覆盖率或业务硬性指标，否则会陷入无休止且主观的自我纠错循环。

## 实践指南
非常适合“写代码 + 写配套单测并在虚拟盒里运行”这类的闭环验证。如果 Verifier 发现报错或不符，直接把反馈推回给 Generator。限制此环路通常配置为 3-5 次。

## 关联概念
- [[narrow-scope-ai-review]] — 在此架构中 Verifier 所具体执行的战术动作。
