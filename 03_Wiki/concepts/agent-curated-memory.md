---
concept: "Agent 策展式记忆"
concept_id: "agent-curated-memory"
aliases: ["Agent-Curated Memory"]
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Hermes Agent 从中级到高级进阶指南.md"
related_concepts:
  - "[[memory-nudge-mechanism]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# Agent 策展式记忆 (Agent-Curated Memory)

## 定义
区别于全量记录聊天对话，策展式记忆指的是由 Agent 在后台主动判断、精炼并覆盖更新特定知识库（如 `MEMORY.md`），作为系统高价值、高密度的永久记忆存储机制。

## 核心要点
- **避免前缀污染**：全量历史写入会导致 KV Cache 前缀在每轮对话中剧烈改变，破坏缓存并带来灾难性的推理成本。冻结快照设计能将头部稳定化。（来源：[[[Agent_Architecture] Hermes Agent 从中级到高级进阶指南.md]]）
- **去重与清洗**：过滤掉思维发散、临时试错的代码，只保留确定的事实（如用户的 Python 偏好路径），类似于系统梳理知识。

## 实践指南
使用者在意识到这是一个策展提取机制时，需要更加“指令化”。例如：不要指望 AI 自己明白刚才某个报错的解决方案是有价值的，而应使用明确指令要求“将这段修复方案列入你的底层记忆以免之后忘掉”。

## 关联概念
- [[memory-nudge-mechanism]] — 触发这种主观策展行为背后的定时机器齿轮。
