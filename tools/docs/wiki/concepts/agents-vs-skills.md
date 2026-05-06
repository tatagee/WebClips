---
title: "agents-vs-skills"
concept: "指令 vs 技能 (Agents vs Skills)"
concept_id: "agents-vs-skills"
aliases: ['AGENTS.md']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] AGENTS.md outperforms skills in our agent evals.md"
related_concepts: []
created_at: "2026-04-04"
last_compiled: "2026-04-04"
---

# 指令 vs 技能 (Agents vs Skills)

## 定义
直接给 Agent 提供指令文件 (AGENTS.md) 与将其功能封装为具体可调用 Skill 的优劣对比。

## 核心要点
- 该概念由多篇最新文章综合得出。
- 在当前技术语境下，它解决了规模化扩展的核心瓶颈。

## 实践指南
对于高度特定于仓库上下文的规则，应使用 AGENTS.md；对于可跨项目复用的标准化动作链，应封装为 Agent Skill。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[Agent_Architecture] AGENTS outperforms skills in our agent evals](/library/Agent_Architecture/Agent_Architecture%20-%20AGENTS.md%C2%A0outperforms%20skills%20in%20our%20agent%20evals) | "系统自动归档提炼的要点摘要..." |
