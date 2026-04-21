---
concept: "消息总线模式"
concept_id: "message-bus-pattern"
aliases: []
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md"
related_concepts:
  - "[[multi-agent-orchestrator]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 消息总线模式 (Message Bus Pattern)

## 定义
一种极端去中心化的多 Agent 工作流。基于事件驱动架构（Pub/Sub），所有 Agent 发布它们完成的事件至中央总线，其它具有相应工具/处理能力的 Agent 自发响应订阅并接手下游工作。

## 核心要点
- **动态寻址**：由于没有强主干控制（如 Orchestrator 模式），非常利于处理完全不可预测的工作链。（来源：[[[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md]]）
- **高韧性**：单一职能的 Agent 崩溃不会影响全系统，只需再起一个订阅相同事件的克隆即可恢复工作。

## 实践指南
不建议用于强时序任务（如写代码编译）。适合在类似“安全应急响应分发”、“互联网舆情监控警报体系”中部署。

## 关联概念
- [[multi-agent-orchestrator]] — 可参考 Orchestrator，与此模式形成了中心化与去中心化的两端。
