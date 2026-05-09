---
title: "ai-native-ci-cd"
concept: "AI 原生 CI/CD"
concept_id: "ai-native-ci-cd"
aliases: ["AI Native CI CD"]
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] Why Your “AI-First” Strategy Is Probably Wrong.md"
related_concepts:
  - "[[agent-harness-pattern]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# AI 原生 CI/CD (AI-Native CI/CD)

## 定义
在以 AI 为主导生产库的架构中，重新设计的决定性交付流水线。其目的是无缝地限制、验证和通过由不可靠 AI 生成的代码变更，确保基础的安全。

## 核心要点
- **零条件强制验证**：管道包括语法检查、单测、端到端测试，且该流程必须是确定性的，即不能被手工绕过。（来源：[[Agent_Architecture] Why Your “AI-First” Strategy Is Probably Wrong.md](/library/Agent_Architecture/Agent_Architecture%20-%20Why%20Your%20%E2%80%9CAI-First%E2%80%9D%20Strategy%20Is%20Probably%20Wrong)）
- **多道护栏**：在合流前应默认引入不同角色专注审查，如安全审查、性能审查。

## 实践指南
如果你使用 Agent，不要让人类成为合并的唯一关卡。人类的价值在于审查意图的“战术或战略风险”，而微观实现应百分百交给硬核通过性的自动化管线。

## 关联概念
- [agent-harness-pattern](/wiki/concepts/agent-harness-pattern) — 将此种强制执行的确定性系统当做一种核心的支持平台。
