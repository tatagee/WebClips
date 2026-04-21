---
concept: "Agentic Patterns"
concept_id: "agentic-patterns"
aliases: ['智能体设计模式', 'LLM-Patterns']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Building Effective AI Agents.md"
related_concepts:
  - "[[workflows-vs-agents]]"
  - "[[augmented-llm]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Agentic Patterns (智能体设计模式)

Anthropic 总结了 5 种在生产环境中常见的智能体工作流模式，这些模式通常可以进行组合使用。

## 1. Prompt Chaining (提示词链)
将任务分解为一系列步骤，每个 LLM 调用处理上一个调用的输出。
- **适用点**：任务可以清晰分解为固定子任务。
- **优势**：用延迟换精度，降低单个 LLM 调用难度。
- **示例**：生成行销文案 -> 翻译为多语言。

## 2. Routing (路由)
对输入进行分类，并将其定向到专门的后续任务。
- **适用点**：存在明显的类别区分（如客服分类）。
- **优势**：关注点分离，可针对特定输入优化 Prompt。
- **示例**：退款请求路由至退款逻辑，技术报告路由至技术支持。

## 3. Parallelization (并行化)
多个 LLM 同时工作，输出结果由程序汇总。
- **分叉模式**：
    - **Sectioning (分段)**：将任务分解为独立的子任务并行。
    - **Voting (投票)**：运行相同任务多次以获得多样化输出或共识。
- **示例**：同时检查代码漏洞与文档质量。

## 4. Orchestrator-Workers (编排者-工作者)
中央 LLM 动态分解任务，委派给工作者 LLM，并综合其结果。
- **适用点**：无法预测所需子任务的数量和性质（如编写代码、复杂调研）。
- **示例**：Coding Agent 修改多个文件（无法预知文件数量）。

## 5. Evaluator-Optimizer (评估者-优化者)
一个 LLM 调用生成响应，另一个提供评估和反馈，形成循环。
- **适用点**：有清晰的评估标准，且迭代改进具有可衡量的价值。
- **示例**：文学翻译（评估者提供修辞改进意见）。

## 6. Supervisor Pattern (监督员模式)
2026 年的核心交互转变：用户从操作员变为监督员。
- **意图委托 (Intent Delegation)**：用户提供结果规范（Outcome Specification）而非操作步骤。
- **适用点**：高不确定性、长生命周期的任务。
- **示例**：[[intent-delegation-ux]] 描述的“老师-助手-负责人”三元组架构。

## 7. Negotiation Surface (编排层谈判)
在执行高风险或多代理冲突任务前的关键层级。
- **核心**：执行前的计划披露与风险对齐，平衡效率与“刻意摩擦（Cognitive Friction）”。
- **示例**：金融 AI 在执行大额转账前，主动在 UI 层暴露 ROP 链式逻辑图供人类审计。

## 8. Scaffolding-as-the-Moat (脚手架护城河)
安全与效率不在于模型，而在于支撑模型的“脚手架”。
- **反馈原谕 (Oracles)**：集成编译器、测试运行器、安全扫描器作为闭环反馈，弥补模型推理的“能力锯齿（Jaggedness）”。
- **典型架构**：[[jagged-frontier-security]] 提到的以系统为核心的防御。

---
## 实践指南
- **模式选择矩阵**：
  - 如果任务可以分解为清晰的 1, 2, 3 步 -> **Chaining**。
  - 如果输入类型决定处理方式 -> **Routing**。
  - 如果需要高并发或多样性 -> **Parallelization**。
  - 如果任务高度不确定且需要跨文件操作 -> **Orchestrator-Workers**。
- **防止死循环**：在 Evaluator-Optimizer 模式中，务必设置 `max_iterations` 计数器，防止 AI 陷入永无止境的“微调-打回”死循环。

---
## 自主智能体 (Autonomous Agents)
当上述模式组合并具备**环境感知 (Ground Truth)** 和**容错恢复**能力时，即进化为 Autonomous Agents。它们在执行过程中通过工具返回的结果不断修正自我的计划。

---
## 参考链接
- [[[Agent_Architecture] Building Effective AI Agents]]
- [[[Agent_Architecture] 发现意图：AI 时代的用户体验设计]]
- [[[Agent_Architecture] AI Cybersecurity After Mythos]]
- [[[AI_IDE_And_CLI] Hermes 全部高阶工具配置]]
