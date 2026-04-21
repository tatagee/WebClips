---
concept: "共享状态模式"
concept_id: "shared-state-pattern"
aliases: []
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md"
related_concepts:
  - "[[context-optimization]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 共享状态模式 (Shared-state Pattern)

## 定义
所有 Agent 在执行过程中共享同一个内存空间或外部数据库，并能感知彼此对该空间的写入和标记，通过对同一实体状态的并发探索达成任务。

## 核心要点
- **群体智能涌现**：通过黑板架构（Blackboard System），不需要直接对话（避免大量无效消息），也能实现不同 Agent 接力处理同一个复杂目标（如共同写一本书的不同章节或寻找漏洞群）。（来源：[[[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md]]）
- **状态锁**：非常依赖底层平台对于共享节点的正确排他锁设定，否则易引发状态冲突。

## 实践指南
如果两个智能体需要进行复杂的资料共享，放弃让它们互发长篇消息，转而让它们读写同一个共享状态持久化文件（如 JSON）。

## 关联概念
- [[context-optimization]] — 这是将 Token 从上下文对话框剥离到持久层的重要实现方式。
