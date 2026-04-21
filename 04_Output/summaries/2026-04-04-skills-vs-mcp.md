---
title: "Agent Skills 与 MCP 的区别及各自作用"
query: "skills有什么用，和mcp有什么区别"
sources_consulted:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1).md"
  - "02_Library/NotebookLM_Workflows/[NotebookLM_Workflows] Integrate-NotebookLM-with-Gemini-CLI,-Google-Antigravity-or-Other-Agents-with-MCP.md"
  - "03_Wiki/concepts/skill-design-patterns.md"
created_at: "2026-04-04"
type: "summary"
---

# Agent Skills 与 MCP 的区别对比研究

## TL;DR (一句话总结)
- **MCP (Model Context Protocol)** 是 **骨骼与肌肉（行动/数据层）**：它为 Agent 提供标准化的外部工具调用接口（如查数据库、调 API）。
- **Agent Skills (技能)** 是 **大脑与经验（知识/工作流层）**：它按需为 Agent 注入领域知识、操作规范和固定的业务逻辑。

两者是**互补关系**，MCP 提供能力，Skills 决定如何优雅地组合这些能力。

---

## 详细功能对比

| 维度 | MCP (Model Context Protocol) | Agent Skills |
| :--- | :--- | :--- |
| **核心定义** | 开放的连接协议标准("AI界的USB-C") | 动态加载的上下文和工作流封装 |
| **主要解决什么问题** | 赋予大模型 **行动力 (Action)** 和 **获取数据的能力** | 赋予大模型 **特定领域的知识 (Knowledge)** 和流程规则 |
| **具体形式** | 一个独立运行的 Server（通常独立于项目代码） | 一组按需动态注入的指令文件（如 `SKILL.md`） |
| **回答的问题** | "如何调用数据库？如何调天气 API？" | "遇到旅游规划需求时，我该分几步走？什么该做？什么不该做？" |
| **扩展性** | "即插即用"：开发一个 MCP，任何客户端 (Antigravity, Gemini CLI) 均可使用 | "特定环境"：根据当前工程的需要或特定框架（如 ADK）动态挂载 |

## 实战举例说明

根据 Pavan Belagatti 的推文和 ADK 博客的设计原则，它们的协同工作如下：

**场景：用户要求 Agent "规划一次去东京的 3 天旅程"**

1. **Agent Skills 发挥作用（规划与知识段）：**
   - Agent 首先挂载 `travel-planner` Skill。
   - 该 Skill 会给它注入**经验**："当用户问旅游时，你必须（1）先查当地天气，（2）根据天气挑选合适的室内外景点，（3）最后输出一个 Markdown 表格。"
2. **MCP 发挥作用（执行动作段）：**
   - Agent 根据 Skill 的指导，需要查东京天气。它发现自己挂载了 `Weather-API-MCP`。
   - 它通过 MCP 发起实际的 HTTP 请求，获取了真实的天气数据。
3. **协同组合：**
   - Agent 拿到 MCP 返回的天气数据后，再次参照 Skill 里的"必须输出 Markdown 表格"的指南，将结果呈现给用户。

## 结论

在构建先进的 AI 应用时，你不应该在 MCP 和 Skills 之间做"二选一"，而是应该**同时使用它们**。使用 MCP 让你的系统能够接入真实的外部世界，使用 Agent Skills 进行**渐进式披露 (Progressive Disclosure)**，让你庞大的业务逻辑可以在 Agent 需要时随时"闪现"在它的脑海中。
