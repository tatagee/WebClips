---
title: "obsidian-as-second-brain"
concept: "Obsidian 作为第二大脑"
concept_id: "obsidian-as-second-brain"
aliases: []
sources:
  - "02_Library/AI_Prompt_Engineering/[AI_Prompt_Engineering] Prompting is the worst way to use Claude. Do this instead_.md"
related_concepts:
  - "[[context-optimization]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# Obsidian 作为第二大脑 (Obsidian as Second Brain)

## 定义
使用 Obsidian (一款本地 Markdown 笔记软件) 来构建和组织 AI 的上下文，借由目录结构、双向链接使得 AI 的工作环境（工作流设定、历史、知识积累）变得持久可见、可编辑。

## 核心要点
- **基于物理存在的提示词**：与其每次开启新会话靠长文 Prompt，不如维护一系列含有工作模式描述的本地 `.md` 文件。
- **与工作区同步**：通过让代码助手直接挂载此类 Obsidian Vault 文件夹，使得每次 Agent 开始任务前主动从这个“第二大脑”拉取人设和最新约束条件。

## 实践指南
可以设立一个具体的项目结构如 `/Project/Agent_Memory` 交由 Obsidian 渲染编辑，包括诸如 `Rules.md`, `Memory.md`, `Current_Tasks.md`。这让你能在日常笔记流中无缝修改 AI 的大脑参数。

## 关联概念
- [context-optimization](/wiki/concepts/context-optimization) — 属于通过预置环境代替单次超大文本输入的实践。
