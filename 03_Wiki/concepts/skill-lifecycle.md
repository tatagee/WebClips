---
concept: "Skill Lifecycle"
concept_id: "skill-lifecycle"
aliases: ['技能生命周期', 'Agent-Skills-Workflow']
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] Production-grade engineering skills for AI coding agents.md"
related_concepts:
  - "[[agentic-patterns]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Skill Lifecycle (技能生命周期)

## 核心流程 (The 6 Phases)
生产级 AI 编码智能体应遵循与资深工程师一致的 6 阶段开发周期：

1. **DEFINE (/spec)**：定义构建目标。原则：**Spec before code (先规范后代码)**。
2. **PLAN (/plan)**：规划实现路径。原则：**Small, atomic tasks (小而原子的任务)**。
3. **BUILD (/build)**：增量代码实现。原则：**One slice at a time (一次实现一个切片)**。
4. **VERIFY (/test)**：验证功能正确。原则：**Tests are proof (测试即证明)**。
5. **REVIEW (/review)**：合入前的质量关卡。原则：**Improve code health (提升代码健康度)**。
6. **SHIP (/ship)**：发布上线。原则：**Faster is safer (快速发布更安全)**。
7. **EVOLVE (自动学习/演化)**：Agent-Managed Skills。高阶 Agent 在多次完成相似复杂任务并提取模式后，系统能够自我策展，将散落的操作经历固化编写为一个全新的高优技能配置。（来源：[[[Agent_Architecture] Hermes Agent 从中级到高级进阶指南.md]]）

## 技能解析 (Skill Anatomy)
每个 Agent Skill 并非简单的提示词，而是一个包含以下结构的**结构化工作流**：

- **Overview**：技能用途。
- **Trigger**：何时触发。
- **Process**：单步工作流与检查点。
- **Anti-rationalization**：**反辩护机制**。列出 Agent 可能跳过步骤的借口（如“我稍后补测试”）并给出强制执行理由。
- **Verification**：证据要求。不接受“似乎正确”，必须有测试通过或运行日志。

## 核心理念
> "Skills bake in best practices from Google's engineering culture. They are workflows agents follow, not reference docs they read."

---
## 实践指南
- **Spec-First 模版**：在开始任何 Skill 之前，强制要求 Agent 生成一个 `SPEC.md`。
- **反辩护机制检查**：自查 Skill 说明中是否包含“如果环境不匹配，请不要尝试猜测，直接报错”这类硬约束。
- **演化审计**：每 10 次自动演化任务后，人类应对固化的 Skill 进行一次代码审计，确保没有引入“针对特定项目的脏逻辑”。

---
## 参考链接
- [[[ADK_Agent_Skills] Production-grade engineering skills for AI coding agents]]
- [[[Agent_Architecture] Hermes Agent 从中级到高级进阶指南.md]]
