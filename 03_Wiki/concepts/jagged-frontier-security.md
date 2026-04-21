---
concept: "能力锯齿边缘与安全护城河"
concept_id: "jagged-frontier-security"
aliases: ['Scaffolding-Moat', 'Jagged-Frontier']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] AI Cybersecurity After Mythos.md"
related_concepts:
  - "[[agent-harness-pattern]]"
  - "[[narrow-scope-ai-review]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# 能力锯齿边缘与安全护城河 (Jagged Frontier)

## 定义
在 AI 网络安全领域，模型的能力增长并不是随着参数量线性平滑提升的，而是呈现出“锯齿状（Jagged）”：小型模型在某些特定安全任务上的表现可能超越大型顶级模型。

## 核心观点：系统即护城河 (System as Moat)
AI 安全的真正价值不在于模型本身的推理能力（Intelligence per token），而在于包裹模型的**脚手架系统（Scaffolding System）**。
- **模块化流水线**：安全任务应拆解为：广谱扫描 -> 漏洞检测 -> 自动验证（Triage） -> 补丁生成。每一个环节都可以匹配最合适的模型。
- **验证原谕 (Validation Oracles)**：引入编译器异常、ASan（AddressSanitizer）或崩溃原谕作为反馈回路，比追求更聪明的模型更有效。
- **广普搜寻 (A Thousand Detectives)**：1000 个廉价模型全量扫描的防御效果，优于 1 个昂贵模型在局部进行的“天才”推断。

## 为什么护城河在系统？
1. **模型不可知论 (Model Agnostic)**：顶级安全架构必须能随时替换后端模型，以应对锯齿边缘的动态变化。
2. **信任建立**：安全工具的核心是减少误报（False Positives）。这种“特异性（Specificity）”依赖于系统侧的静态/动态分析辅助，而非模型的直觉。
3. **长期记忆**：安全上下文通常跨越 25 年以上的历史 Bug 记录，这需要系统层面的知识图谱（如 Hindsight）支持。

---
## 实践指南
- **防御侧**：优先构建基于工具（tools/mcp）的验证链。
- **成本策略**：使用小型 MoE 模型（如 GPT-OSS-20b）执行初筛，仅在漏洞验证环节调用高价模型（如 Mythos/Opus）。

---
## 参考链接
- [[[Agent_Architecture] AI Cybersecurity After Mythos]]
