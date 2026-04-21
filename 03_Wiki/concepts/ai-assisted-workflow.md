---
concept: "AI 辅助工作流"
concept_id: "ai-assisted-workflow"
aliases: []
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] My AI-Assisted workflow.md"
related_concepts:
  - "[[progressive-disclosure]]"
  - "[[ide-evolution]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# AI 辅助工作流 (AI-Assisted Workflow)

## 定义
一种将软件开发中“思考与需求验证”前置的工作流。核心主张是人工负责意图梳理与边界约束，利用 AI 进行极其严苛的 PRD 发问与任务拆解，而非直接用 AI 生成代码。

## 核心要点
- **拒绝直接编程**：认为 AI 擅长实现代码，但极不擅长明确意图、补全隐含假设（来源：[[[ADK_Agent_Skills] My AI-Assisted workflow.md]]）
- **撰写 AI 友好的需求**：强制先在人类脑中输出 Free-form plan，再由 AI Interviewer 步步发问形成明确的垂直切片层。
- **任务作为 Prompt 向下传递**：任务描述本身不再是写给人类同事看的 Notes，而是给下游 AI 写代码时的系统级 Prompt，包含意图和输入输出约束。

## 实践指南
当需要用 AI 构建新功能时，不要打开 IDE 马上写代码。先手写一段纯文本说明目标，让另一个专门做设计的 Agent 审阅你的计划，并针对异常流、非功能性需求反复提问。只有形成确定性的 PRD 或 Issue 后，再让子 Agent 按切片（非横向扩展）进行单点实现。

## 关联概念
- [[vertical-slice-issues]] — 构成此工作流的具体拆解单元
- [[narrow-scope-ai-review]] — 结合此工作流在实施阶段配套的验证环节

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[[ADK_Agent_Skills] My AI-Assisted workflow.md]] | "What is AI actually good at? Implementation. What is it genuinely bad at? Figuring out what you actually want, catching the assumptions you forgot to make explicit... That’s your job. It will always be your job." |
