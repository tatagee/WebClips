---
connection: "Workflows vs Agents 分析"
connection_id: "workflows-vs-agents-analysis"
related_concepts:
  - "[[workflows-vs-agents]]"
  - "[[agentic-patterns]]"
  - "[[agent-harness-pattern]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# 架构对比：Workflows 对比 Agents

## 深度分析
在构建 AI 智能体系统时，最常见的错误是过早地引入“完全自主的 Agent”。根据 Anthropic 的经验，**Workflows (工作流)** 往往是 80% 场景下的最优解。

### 决策矩阵

| 特性 | **Workflows** | **Autonomous Agents** |
| :--- | :--- | :--- |
| **可预测性** | 极高 (由于由于代码控制) | 较低 (由于由于 LLM 动态决策) |
| **纠错机制** | 预定义的 Gate 检查 | 运行时的 Ground Truth 校验与重试 |
| **调试难度** | 容易 (有明确的任务边界) | 困难 (存在复合幻觉) |
| **Token 消耗** | 相对较低且可控 | 可能因死循环而失控 |

### 混合架构建议
在生产环境中，最有效的做法是**以 Workflow 为骨架，在原子节点上嵌入特定模式的 Agent**：
- 使用 **Routing** 确定意图。
- 使用 **Prompt Chaining** 处理结构化转换。
- 仅在需要高度灵活性（如文件系统大规模修改）时，才切换到 **Orchestrator-Workers** 模式。

## 结论
不要追求“最聪明”的模型做最复杂的事，而要追求“最稳定”的架构。

---
## 参考链接
- [[[Agent_Architecture] Building Effective AI Agents]]
