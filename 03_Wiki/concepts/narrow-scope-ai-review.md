---
concept: "窄作用域 AI 代码审查"
concept_id: "narrow-scope-ai-review"
aliases: []
sources:
  - "02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] My AI-Assisted workflow.md"
related_concepts:
  - "[[ai-assisted-workflow]]"
  - "[[ai-native-ci-cd]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 窄作用域 AI 代码审查 (Narrow Scope AI Review)

## 定义
区别于对整个项目运行一次性弱反馈。该模式指代将代码校验拆分为多个细粒度的“过检阶段”，每个 AI 针对不同目标（逻辑、顺序、模式）做极窄作用域的代码评估。

## 核心要点
- **狭窄的审查焦点**：一次性审查大量文件的全面问题效果很差；必须局限于单次 PR（Pull Request）级别并拆分关注点，如针对性检查“操作顺序”这种 AI 常犯的隐蔽错误（来源：[[[ADK_Agent_Skills] My AI-Assisted workflow.md]]）
- **操作顺序倒挂重点关注**：AI 高频出现“先发通知再提交流水”、“验证数据前变异状态”等错误，需用专属审查通道识别。

## 实践指南
在合并包含 AI 产出的 PR 时，引入 6 道标准化自动化弱检（如：安全性、魔法字符串值等）工作流。AI Agent 可利用针对性 Prompts 将代码当成审理对象，通过独立批次分别运行逻辑找虫。

## 关联概念
- [[agent-harness-pattern]] — 代码审查作为安全 Harness 的一部分来应对脆弱的生成产物。
- [[ai-native-ci-cd]] — 这个行为往往作为自动化管线中的某个 Action 以便不阻碍 AI 进行极速迭代。

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
| [[[ADK_Agent_Skills] My AI-Assisted workflow.md]] | "Models tend to produce code that does the right things but sometimes in the wrong sequence: sending a notification before committing a transaction... These bugs are easy to miss in review because the code looks correct at a glance." |
