---
concept: "垂直切片 Issue"
concept_id: "vertical-slice-issues"
aliases: []
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] My AI-Assisted workflow.md"
related_concepts:
  - "[[ai-assisted-workflow]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 垂直切片 Issue (Vertical Slice Issues)

## 定义
在 AI 驱动的项目开发中，任务拆解必须遵循“贯穿所有层级（从前端到数据库）”的原子化路径设计，以保证 AI 每个子任务的输出均可验证闭环。

## 核心要点
- **拒绝横向分层拆解**：针对单一技术栈层面（只动数据库，或只动 UI）的工单不利于 AI 完成闭环校验（来源：[[[ADK_Agent_Skills] My AI-Assisted workflow.md]]）
- **Tracer Bullets 验证**：切片需要是一颗“曳光弹”，完成后的状态必须是功能层面端到端可验证或演示的。
- **AFK 与 HITL 分类**：每个垂直切片明确是否需要人类离开键盘 (Away From Keyboard) 或保持在线干预 (Human In The Loop)。

## 实践指南
给 AI 下达复杂迭代指令时，必须按用户故事贯穿各个模块：如“用户登录页面的邮箱校验和接口验证”作为一个任务，而不是把“写前端”和“写后端”拆为两个平行的 Agent Task。

## 关联概念
- [[ai-assisted-workflow]] — AI 高效执行的前提依赖于正确的任务下发格式。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[[ADK_Agent_Skills] My AI-Assisted workflow.md]] | "tracer bullets that cut through every integration layer end-to-end rather than horizontal slices of a single layer. A slice that only touches the database, or only touches the UI, is not a valid slice." |
