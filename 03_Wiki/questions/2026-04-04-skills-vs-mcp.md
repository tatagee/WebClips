---
question: "skills有什么用，和mcp有什么区别"
answer_summary: "MCP 提供底层的数据/工具连接能力（手和眼睛），而 Skills 提供基于这些工具的上层领域知识与业务流程设计（大脑与经验）。两者是组合互补关系。"
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1).md"
  - "02_Library/NotebookLM_Workflows/[NotebookLM_Workflows] Integrate-NotebookLM-with-Gemini-CLI,-Google-Antigravity-or-Other-Agents-with-MCP.md"
  - "03_Wiki/concepts/skill-design-patterns.md"
created_at: "2026-04-04"
---

# Q: Skills 有什么用，和 MCP 有什么区别？

## 简短回答
- **MCP (Model Context Protocol)** 是 **骨骼与肌肉（行动/数据层）**：它为 Agent 提供标准化的外部工具调用接口（如查数据库、调 API）。
- **Agent Skills (技能)** 是 **大脑与经验（知识/工作流层）**：它按需为 Agent 注入领域知识、操作规范和固定的业务逻辑。

两者是互补协作关系：MCP 提供原子化能力，Skills 决定如何优雅地调度这些能力。

## 详细分析

### 何为 MCP？
MCP 被形容为“AI 界应用连接的 USB-C 接口”。它的核心目的是解决 `M*N` 的多对多直连问题。一旦为某个服务（例如 NotebookLM、GitHub、天气 API）编写了 MCP server，那么任何支持 MCP 协议的 Agent (如 Antigravity, Gemini CLI) 都可以无缝挂载它们，从而获得了**执行**这类动作的“接口”权益。

### 何为 Skills？
Agent Skills 是解决**上下文疲劳**与**能力注入**的轻量级解决方案。相比于在 System Prompt 当中塞入巨量的业务规范文档（容易让模型注意力涣散并消耗极多 Tokens），大模型在识别到某个业务意图后，通过工具系统临时装载指定的 `SKILL.md`，获得**如何执行**这个任务的“步骤经验”。

### 工作流实战案例：东京旅游规划
1. **Agent Skills (制定策略)**：系统挂载 `travel-planner` Skill，该 Skill 告诉 Agent："第一步查天气，第二步定路线，第三步生成 Markdown 表格。"
2. **MCP (执行动作)**：Agent 通过内置的 `Weather-API-MCP` 发起真实的外部请求，拿到东京的实时温度。
3. **闭环**：Agent 根据天气的返回事实（MCP 提供），再依据制表约束（Skill 提供），将正确的答案呈递给用户。

## 相关概念
- [[skill-design-patterns]]
- [[progressive-disclosure]]
- [[knowledge-compilation-vs-rag]]
