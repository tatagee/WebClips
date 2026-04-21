---
concept: "极简 AI 启动栈"
concept_id: "lean-ai-stack-bootstrapping"
aliases: ['$20-Tech-Stack', 'Context-Paging']
sources:
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] How I run 10K MRR on 20 budget.md"
related_concepts:
  - "[[context-optimization]]"
  - "[[notebooklm-rag-orchestration]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# 极简 AI 启动栈 (Lean AI Stack)

## 设计哲学
由于云服务商（AWS/GCP）倾向于引导用户使用复杂且昂贵的服务，2026 年的独立开发者应回归“极简主义”，将每一分钱花在 AI 推理（Intelligence）而非基础设施（Cloud Bloat）上。

## 典型配置 ($20-$40/mo)
- **服务器**：1GB RAM VPS (Linode/DigitalOcean)。
- **语言**：Go (静态编译，部署极简，AI 易读)。
- **存储**：SQLite3 + WAL 模式（单文件，零网络跳跃，性能远超远程数据库）。
- **推理层**：
  - **Local Batch**: 购买二手 GPU (如 3090) 跑 vLLM 做离线研究。
  - **Frontier API**: 通过 OpenRouter 聚合所有模型。

## 核心算法：上下文分页 (Context Paging)
模仿操作系统的虚存管理。
- **SWAP 逻辑**：将对话中次要的、暂时不活跃的信息“交换（Page out）”到外部存储（如嵌入式数据库）。
- **Active Window**：仅保留最核心的事实和当前任务锚点在 LLM 的活跃上下文（8K Context）中。
- **价值**：极大降低了在处理长周期任务时的平均 Prompt 价格。

## 开发技巧
- **补贴套利**：利用微软等公司的定价模型（如订阅制 Copilot Chat），将超大 context 的修改任务交给能无限追加轮次的工具，“让大厂补贴你的算力成本”。

---
## 实践指南
- **DB 配置**：`PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;` 开启 SQLite 并发潜能。
- **Agent 设计**：在 Agent 的 Memory 控制循环中，加入自动分页（Page out）决策逻辑。

---
## 参考链接
- [[[AI_IDE_And_CLI] How I run 10K MRR on 20 budget]]
