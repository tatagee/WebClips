---
concept: "Agent-Computer Interface"
concept_id: "agent-computer-interface"
aliases: ['ACI', 'Tool-Prompting', '工具提示工程']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Building Effective AI Agents.md"
related_concepts:
  - "[[augmented-llm]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Agent-Computer Interface (ACI)

## 背景
正如人机交互 (HCI) 决定了人类使用软件的体验，**Agent-Computer Interface (ACI)** 决定了 AI 代理使用工具的成功率。

## ACI 设计四原则
1. **给模型思考空间 (Tokens to Think)**：在执行工具前允许模型生成思维链（思索）。
2. **贴近自然格式**：保持工具输出格式接近互联网上自然出现的文本（例如 Markdown 而非过度转义的 JSON）。
3. **消除零散开销**：避免让模型处理复杂的格式（如手动计算行数偏移或转义引号）。
4. **防呆设计 (Poka-yoke)**：通过参数限制，让错误的调用方式难以发生。

## 工具 Prompt 工程最佳实践
- **清晰的参数名**：像为同事编写文档注释一样编写工具说明。
- **示例驱动**：在定义中包含边界案例和输入要求。
- **绝对路径优先**：Agent 在移动目录后容易在相对路径上出错，强制使用绝对路径可显著提高稳定性。
- **工作坊验证**：在 Workbench 中模拟各种错误输入，观察模型如何误用工具并迭代。

---
## 实践指南
- **工具定义检查清单**：
  - [ ] 是否提供了 3 个以上的正向调用示例？
  - [ ] 是否在参数描述中明确了“单位”（如毫秒、相对路径）？
  - [ ] 是否包含错误处理分支（如果...则返回 XYZ 错误）？
- **Model-as-the-User 测试**：在发布工具前，让另一个模型（如 GPT-4）模拟使用该 ACI，检查它是否能在不看外部文档的情况下正确调用。

---
## 关键引用
> "Putting yourself in the model's shoes. Is it obvious how to use this tool, or would you need to think carefully about it?"

---
## 参考链接
- [[[Agent_Architecture] Building Effective AI Agents]]
