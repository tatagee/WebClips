---
title: "augmented-llm"
concept: "Augmented LLM"
concept_id: "augmented-llm"
aliases: ['增强型 LLM', 'Atomic-Agent-Block']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Building Effective AI Agents.md"
related_concepts:
  - "[[agent-computer-interface]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Augmented LLM (增强型 LLM)

## 定义
Agentic Systems 的基本构建块，是标准 LLM 加上各种**增强能力 (Augmentations)** 的组合。

## 核心增强维度
1. **Retrieval (检索)**：访问外部知识库 (RAG)。
2. **Tools (工具使用)**：执行外部代码、调用 API。
3. **Memory (记忆)**：在长会话中保留关键信息。

## 构建原则
- **定制化**：根据具体用例定制能力的边界。
- **接口一致性**：为 LLM 提供易于理解、文档齐全的接口。
- **标准化**：推荐使用 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 来统一工具集成。

---
## 实践指南
- **MCP 优先原则**：优先寻找现成的 MCP Server (如 Google Maps, GitHub, SQLite)，避免为通用功能手写单独工具。
- **记忆策展 (Memory Curation)**：不要存储每一轮对话。仅在检测到明显的“设置、偏好、结论”时，手动触发核心事实存储任务。
- **环境隔离**：在生产环境中，Tools 增强应运行在 Docker 或沙箱化 shell 中，严禁 Agent 直接访问敏感环境变量。

---
## 参考链接
- [[Agent_Architecture] Building Effective AI Agents](/library/Agent_Architecture/Agent_Architecture%20-%20Building%20Effective%20AI%20Agents)
