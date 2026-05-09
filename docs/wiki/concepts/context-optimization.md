---
title: "context-optimization"
concept: "Context Optimization"
concept_id: "context-optimization"
aliases: ['Usage-Limit-Avoidance', 'Token-Efficiency']
sources:
  - "02_Library/AI_Prompt_Engineering/[AI_Prompt_Engineering] I stopped hitting Claude's usage limits - 10 things I changed.md"
related_concepts:
  - "[[claude-code-mastery]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Context Optimization (上下文优化)

## 核心目标
解决 Claude 使用额度限制 (Usage Limits) 的根本方法：减少单次 Prompt 的冗余 Token，最大化利用 Prompt Cache。

## 1. KV 缓存机制 (KV Cache Mechanics)
现代 Transformer 模型（如 Claude 3.5/Opus 4.5）依赖 KV Cache（Key-Value Cache）来复用历史计算结果。
- **前缀匹配原则**：缓存命中必须从 Prompt 的第一个字符开始完全一致。一旦前缀改变（如修改了 System Prompt 的首行），后续所有缓存全部失效。
- **命中收益**：缓存命中的 Token 价格仅为全价的 **1/10**。
- **时效性 (TTL)**：Anthropic 的缓存默认有效期为 **1 小时**（对 Pro/Max 用户），或 **5 分钟**（标准 API 用户）。
- **Causal Mask**：因果遮罩保证了 Token 序列只能单向引用，因此追加末尾内容不会破坏前面的缓存。

## 2. Claude Code 缓存架构 (Block 1-4)
Claude Code CLI 通过精密的四层结构来保护缓存：
1. **Block 1 & 2**：计费归因与 CLI 前缀（不缓存）。
2. **Block 3 (Global)**：静态指令与行为规则（全球用户共享/长期缓存）。
3. **Block 4 (Org/Project)**：动态配置（如 `CLAUDE.md`，通过 `cache_control` 显式标记）。
4. **Messages**：对话历史。

## 3. 实践指南
- **保护缓存前缀**：避免在工作进行中修改 `CLAUDE.md` 或增减 MCP 工具。
- **保持 Session 活跃**：在 1 小时内发送一次简短 Prompt（如 "ok"）可实现 **Cache Keep-Alive**，避免大容量 Context 的二次冷启动扣费。
- **长上下文预热 (Cache Warmup)**：在进行长达数小时的编码会话前，先发送一个包含全量文档的 `warmup` 指令，建立基础缓存。
- **避免频繁切换模型**：Opus 与 Sonnet 的 KV 张量互不通用，切换模型会导致上下文重算。
- **利用 /btw 提问**：子窗口提问不改变主 Session 历史。
- **子智能体 (Sub-agents) 开销**：注意每个 Sub-agent 有独立的缓存链，启动 Sub-agent 等于一次“迷你冷启动”。
- **上下文分页 (Context Paging)**：效仿操作系统，将对话中非当下的背景事实 Page-out 到内存数据库，仅维持核心逻辑和当前任务锚点在活跃窗口。

---
## 参考链接
- [[AI_Prompt_Engineering] 搞懂缓存机制，从Gemma4到Claude Code省80%Token](/library/AI_Prompt_Engineering/AI_Prompt_Engineering%20-%20%E6%90%9E%E6%87%82%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6%EF%BC%8C%E4%BB%8EGemma4%E5%88%B0Claude%20Code%E7%9C%8180%25Token)
- [[AI_IDE_And_CLI] How I run 10K MRR on 20 budget](/library/AI_IDE_And_CLI/AI_IDE_And_CLI%20-%20How%20I%20run%2010K%20MRR%20on%2020%20budget)
- [[AI_Prompt_Engineering] I stopped hitting Claude's usage limits - 10 things I changed](/library/AI_Prompt_Engineering/AI_Prompt_Engineering%20-%20I%20stopped%20hitting%20Claude's%20usage%20limits%20-%2010%20things%20I%20changed)
- [[AI_Prompt_Engineering] How to set up Claude Cowork (the April 2026 update)_.md](/library/AI_Prompt_Engineering/AI_Prompt_Engineering%20-%20How%20to%20set%20up%20Claude%20Cowork%20(the%20April%202026%20update)_)
- [[AI_Prompt_Engineering] Prompting is the worst way to use Claude. Do this instead_.md](/library/AI_Prompt_Engineering/AI_Prompt_Engineering%20-%20Prompting%20is%20the%20worst%20way%20to%20use%20Claude.%20Do%20this%20instead_)
