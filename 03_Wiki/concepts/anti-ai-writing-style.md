---
concept: "反 AI 写作风格"
concept_id: "anti-ai-writing-style"
aliases: ["Anti-AI Writing Style"]
sources:
  - "02_Library/AI_Prompt_Engineering/[AI_Prompt_Engineering] How to set up Claude Cowork (the April 2026 update)_.md"
related_concepts:
  - "[[context-optimization]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 反 AI 写作风格 (Anti-AI Writing Style)

## 定义
一种应对大型语言模型“陈词滥调”和“套路化语气”策略。通过建立专门的负面指示词黑名单（通常保存在独立文件如 `writing_rules.md` 中），明确禁止 AI 使用各类常见的 AI 味词汇和句形。

## 核心要点
- **黑名单机制**：不要仅仅说“请自然地写作”，而是明确指出绝对不允许涉及的词汇，诸如：'delve', 'ensure', 'moreover', 'embrace' 等。（来源：[[[AI_Prompt_Engineering] How to set up Claude Cowork (the April 2026 update)_.md]]）
- **禁止过度总结**：AI 喜欢在文章开头总结，并在末尾说“In conclusion...”。可以通过指令强制禁止“Intro and Outro”。

## 实践指南
在给 Agent 的全局 System 指南中，包含一份具体的负面风格清单源文件，利用诸如 `Never use X, Y, Z words` 的形式来纠正 AI 的行文习惯，这是获取拟人化自然输出的最强力手段。

## 关联概念
- [[context-optimization]] — 这是长期背景注入中的一部分优化点。
