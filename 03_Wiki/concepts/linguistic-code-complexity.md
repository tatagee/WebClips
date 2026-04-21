---
concept: "语言学代码复杂度"
concept_id: "linguistic-code-complexity"
aliases: ['MDD', 'DLT', 'Cognitive-Load-for-AI']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] How Complex is my Code.md"
related_concepts:
  - "[[context-optimization]]"
  - "[[claude-code-agent-os]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# 语言学代码复杂度 (Linguistic Code Complexity)

## 核心目标
超越传统的圈复杂度（Cyclomatic Complexity），从认知科学和心理语言学的视角评估：**代码对“人”和“AI”理解的难易程度。**

## 核心指标
1. **平均依赖距离 (Mean Dependency Distance, MDD)**:
   - 定义：变量定义与其使用位置之间的物理行数距离。
   - 对 AI 的影响：距离越远，KV Cache 中的注意力压力越大，容易产生上下文衰减。
2. **依赖局部性理论 (Dependency Locality Theory, DLT)**:
   - 定义：在解析句子（或代码）时，需要在工作记忆中同时保持的“未闭合依赖”数量。
   - 对 AI 的影响：过高的 DLT（如深层嵌套、超长函数 fan-out）会导致 AI 在生成过程中更容易产生“概念漂移”。
3. **类型/词符比 (Type-Token Ratio)**:
   - 定义：唯一单词数与总单词数的比值（接近 Halstead 复杂度）。
   - 反映：代码库的“概念密度”。

## AI 友好型代码原则
- **窄作用域**：降低 MDD。
- **扁平化结构**：降低 DLT。
- **高可预测性 (Low Entropy)**：减少意外的代码设计。AI 在处理低熵（高预测性）代码时，Token 预测的置信度更高，生成的逻辑准确度也更高。

---
## 实践指南
- **重构策略**：不仅要通过圈复杂度找 Bug，更要通过可视化 MDD（依赖连线）找到那些导致 AI 推理变慢的“长程依赖”代码。
- **AI 辅助评估**：使用 `/inspect` 命令配合自定义提示词，让 AI 根据 MDD 和 DLT 为模块打分。

---
## 参考链接
- [[[Agent_Architecture] How Complex is my Code]]
