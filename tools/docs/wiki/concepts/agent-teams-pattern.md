---
title: "agent-teams-pattern"
concept: "团队模式"
concept_id: "agent-teams-pattern"
aliases: ["Agent Teams"]
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md"
related_concepts:
  - "[[multi-agent-orchestrator]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 团队模式 (Agent Teams)

## 定义
相较于随时创建与销毁的 Sub-Agent，此模式下涉及一组具备持久状态的长生命周期 Agent。它们独立运作，基于公共的 backlog 或者相互传递复杂消息体进行常态化协作。

## 核心要点
- **跨周期的持久记忆**：各个团队成员 Agent 能在不同会话中积累处理任务的情境记忆（如总结历史漏洞和风格）。（来源：[[Agent_Architecture] Multi-agent coordination patterns_ Five approaches and when to use them.md](/library/Agent_Architecture/Agent_Architecture%20-%20Multi-agent%20coordination%20patterns_%20Five%20approaches%20and%20when%20to%20use%20them)）
- **排队与缓冲设计**：为了让各个成员异步合作，系统中通常要利用工作队列。

## 实践指南
对于需要“背景知识发酵”和“主观能动性”长期运营（如内容创作流：Researcher & Writer 互相异步批阅素材），应使用 Agent 团队模式，并赋予它们各自管理内部上下文的持久化状态库。而针对即用即抛的代码生成，Orchestrator 更佳。

## 关联概念
- [multi-agent-orchestrator](/wiki/concepts/multi-agent-orchestrator) — 作为应对不同复杂环境的镜像解决方案。
