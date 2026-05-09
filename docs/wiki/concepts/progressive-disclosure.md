---
title: "progressive-disclosure"
concept: "渐进式披露 (Progressive Disclosure)"
concept_id: "progressive-disclosure"
aliases: ['动态上下文']
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1).md"
related_concepts: []
created_at: "2026-04-04"
last_compiled: "2026-04-04"
---

# 渐进式披露 (Progressive Disclosure)

## 定义
一种上下文管理策略，通过工具链按需动态提供信息，而不是一次性将所有可能需要的文档灌入提示词中。

## 核心要点
- 该概念由多篇最新文章综合得出。
- 在当前技术语境下，它解决了规模化扩展的核心瓶颈。

## 实践指南
优先提供架构概览和目录结构，当 Agent 在推理中表明需要具体细节时，再通过 read_file/search 类工具返回深度内容。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[ADK_Agent_Skills] ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1)](/library/ADK_Agent_Skills/ADK_Agent_Skills%20-%20ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1)) | "系统自动归档提炼的要点摘要..." |
