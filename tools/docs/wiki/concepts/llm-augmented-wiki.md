---
title: "llm-augmented-wiki"
concept: "LLM Augmented Wiki"
concept_id: "llm-augmented-wiki"
aliases: ['LLM-Wiki', '知识图谱-Wiki']
sources:
  - "02_Library/NotebookLM_Workflows/[NotebookLM_Workflows] llm-wiki.md"
related_concepts:
  - "[[wiki-automated-generation]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# LLM Augmented Wiki (LLM 增强知识库)

## 设计架构
一种专为人类阅读和 LLM 检索同时优化的知识管理结构。

## 三层模型
1. **01_Inbox**：原始剪藏 (Raw Clips)，保持原状，用于存档和回溯。
2. **02_Library**：初步分类 (Distilled Library)，进行元数据标准化，方便初步检索。
3. **03_Wiki**：概念中心 (Concept-Centric Wiki)，将零散信息重组为结构化概念块。

## 对 LLM 的友好性设计
- **原子性**：每个 Concept 文件只讲一个核心概念。
- **关联性**：大量使用 `[](/wiki/concepts/)` 链接，形成非线性的知识图谱，便于 LLM 进行多跳搜索。
- **扁平化目录**：减少文件夹深度，方便 `grep` 快速定位。

## 演进方向
知识库不仅是静态文档，而应作为 Agent 的“外部大脑”的一部分，通过 `/query-wiki` 命令快速生成研究报告或技术选型建议。

---
## 实践指南
- **元数据自动化**：为 Library 中的文章添加 `tags`, `source_url` 和 `topics`，这是 LLM 进行准确检索的基础。
- **冲突处理**：当两个 Wiki 概念库发生碰撞时，使用 `/merge-concepts` 技能自动执行 MD 知识合并，而非手动剪贴。
- **定期 Lint**：每月运行一次全站链接检查，确保图谱中没有“孤儿页面”。

---
## 参考链接
- [[NotebookLM_Workflows] llm-wiki](/library/NotebookLM_Workflows/NotebookLM_Workflows%20-%20llm-wiki)
