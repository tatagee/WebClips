---
title: "karpathy-claude-rules"
concept: "Karpathy 的 Claude 规则"
concept_id: "karpathy-claude-rules"
aliases: ["Karpathy Principles", "CLAUDE.md Rules"]
sources:
  - "02_Library/Claude_Code_Skills/[Claude_Code_Skills] Google engineer automated 80% of his work with Claude Code. here's the exact system he built..md"
related_concepts:
  - "[[claude-code-mastery]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# Karpathy 的 Claude 规则 (Karpathy's Claude Rules)

## 定义
由 Andrej Karpathy 总结并被社区广泛接受的一套用于指导 AI 编程行为的工程纪律。通过全局的说明文件强制压制大语言模型的自负行为。

## 核心要点
- **Think Before Coding (先思后写)**：强制模型写出推导与取舍方案再落代码，防假设错误。
- **Simplicity First (简洁性优先)**：遏制大模型过度设计（Over-engineering）与引入不必要依赖的坏习惯。
- **Surgical Changes (外科手术式修改)**：极度克制代码改动，仅修改任务直接要求的部分，不动其他。（来源：[[Claude_Code_Skills] Google engineer automated 80% of his work with Claude Code. here's the exact system he built..md](/library/Claude_Code_Skills/Claude_Code_Skills%20-%20Google%20engineer%20automated%2080percent%20of%20his%20work%20with%20Claude%20Code.%20here's%20the%20exact%20system%20he%20built.)）
- **Goal-Driven Execution (目标驱动)**：执行应当有测试目标和可验证的成功标准。

## 实践指南
将这四项原则写入项目根目录下的 `CLAUDE.md`，能够使 Claude 等编码助手的破坏性改写和凭空制造抽象的概率从 40% 下降到 3%。

## 关联概念
- [claude-code-mastery](/wiki/concepts/claude-code-mastery) — 属于掌控 CLI 工具的基础能力。
