---
concept: "角色划分反模式"
concept_id: "role-based-agent-anti-pattern"
aliases: ["三省六部幻觉", "Role-based Agents"]
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] 三省六部幻觉：为什么_虚拟公司_式多Agent架构在工程上不成立.md"
related_concepts:
  - "[[multi-agent-orchestrator]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 角色划分反模式 (Role-based Agent Anti-pattern)

## 定义
在多 Agent 系统设计中，将不同的 Agent 强行设定为人类社会中的“职业角色”（如产品经理、架构师、前端开发、QA），并让任务像在企业部门间流转一样的错误架构设计。

## 核心要点
- **假边界与信息损耗**：大语言模型并不存在人类那样的职业壁垒，强行赋予角色标签只会让 Agent 拒绝越界思考（如“测试”忽略“架构”问题）。同时，文档在一个个角色间单向交接，导致推理链路断裂和关键上下文急剧衰减。（来源：[[[Agent_Architecture] 三省六部幻觉：为什么_虚拟公司_式多Agent架构在工程上不成立.md]]）
- **真正的瓶颈是推理深度**：模型并发工作的瓶颈在于推理窗口与算力，而非人类注意力和学习切换的成本。多 Agent 的价值在于“并行覆盖更大的搜索空间”（比如爬取10个不同的网页），而不是“接力流水线”。
- **工具决定能力**：赋给 Agent 什么样的工具集远比打什么角色标签重要。

## 实践指南
永远不要问“我需要几个扮演不同职能的 Agent”，而应该问“我的任务能否被分解为多个互不相互依赖的并行流”。让一个拥有完整意图的主 Agent 利用工具，或者分叉去探索不同方案，远优于设计一条由“多角色 Agent ”构成的工厂流水线。

## 关联概念
- [[multi-agent-orchestrator]] — 指导如何正确拆分多重并发智能体工作的正面架构模式。
