---
title: "explicit-external-state"
concept: "显式外部状态记忆"
concept_id: "explicit-external-state"
aliases: ["External State Files"]
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] 三省六部幻觉：为什么_虚拟公司_式多Agent架构在工程上不成立.md"
related_concepts:
  - "[[agent-harness-pattern]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 显式外部状态记忆 (Explicit External State)

## 定义
在执行长周期或多会话任务时，强制要求 Agent 将当前的任务进度、结论和避坑指南写入到持久化的物理文件（如 `progress.txt` 或 `spec.md`），以此作为推理连续性的锚点。

## 核心要点
- **对抗推理漂移 (Reasoning Drift)**：大语言模型在超长上下文中极易“前言不搭后语”。正确的做法是把意图从聊天记录中抽出，转化为文件上的代码或文本变动。（来源：[[Agent_Architecture] 三省六部幻觉：为什么_虚拟公司_式多Agent架构在工程上不成立.md](/library/Agent_Architecture/Agent_Architecture%20-%20%E4%B8%89%E7%9C%81%E5%85%AD%E9%83%A8%E5%B9%BB%E8%A7%89%EF%BC%9A%E4%B8%BA%E4%BB%80%E4%B9%88_%E8%99%9A%E6%8B%9F%E5%85%AC%E5%8F%B8_%E5%BC%8F%E5%A4%9AAgent%E6%9E%B6%E6%9E%84%E5%9C%A8%E5%B7%A5%E7%A8%8B%E4%B8%8A%E4%B8%8D%E6%88%90%E7%AB%8B)）
- **分立的状态维度**：一个好的外置状态文件必须包括：确定的目标（防漂移）、当前状态（反映进度）、已完成步骤的历史（不可覆盖式记录）、已知的坑（防重复踩）。

## 实践指南
放弃“试图把所有 Context 喂给最新的一代长文本模型”的想法。当需要开发一个完整的 App 时，让你的 Agent 系统学会阅读并持续重写物理形式的日志和设计规范，所有的逻辑连续性必须“可见”。

## 关联概念
- [agent-harness-pattern](/wiki/concepts/agent-harness-pattern) — 依靠这些生成的文件，人类构建器才能判断系统是否应当被挂起或纠正。
