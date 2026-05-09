---
title: "notebooklm-rag-orchestration"
concept: "NotebookLM RAG 编排模式"
concept_id: "notebooklm-rag-orchestration"
aliases: ['TAP-Model', 'Teacher-Assistant-Principal']
sources:
  - "02_Library/NotebookLM_Workflows/[NotebookLM_Workflows] 用好 NotebookLM 立省 80 Token.md"
related_concepts:
  - "[[context-optimization]]"
  - "[[augmented-llm]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# NotebookLM RAG 编排模式 (TAP 模型)

## 定义
一种通过解耦“重数据检索”与“逻辑推理”来优化 Token 成本的工作流模型。核心思想是让 **NotebookLM** 充当领域专家库，而 **Claude** 充当任务执行者。

## TAP 三要素模型
- **Teacher (老师) — NotebookLM**:
  - 负责存储海量语料（论文、文档、日志）。
  - 提供带引用的 RAG 检索。
  - 角色是“只读咨询台”，不参与代码编写或环境操作。
- **Assistant (助手) — Claude**:
  - 负责逻辑推理、编排工具、执行 Action。
  - 不懂就去问“老师”，只摄入经过 RAG 蒸馏后的几百字答案。
  - 角色是“课题执行人”。
- **Principal (委托人) — 用户**:
  - 负责配置知识边界（初始化 Notebook）。
  - 仅在关键决策点介入。

## 核心价值
1. **常数级成本**：传统模式（Context Stuffing）成本随语料大小线性增长；TAP 模式下，Claude 只看到 RAG 结果，成本近乎恒定且极低。
2. **规避 TTL 限制**：Anthropic 的 Prompt Cache 有 1 小时失效限制，研究场景（思考久、问答慢）命中率低。NotebookLM 的索引永久在线且对用户免费。
3. **事实溯源**：强制要求助手保留 [1][2] 引用，防止 AI 在长文本中产生幻觉。

## 典型场景
- **学术调研**：47 篇论文灌入 NotebookLM，Claude 负责总结对比。
- **财务审计/打新**：同时分析 8 家公司的招股书，生成对比决策表。
- **故障排查**：大量历史日志灌入 NotebookLM，Claude 负责根据异常片段写修复脚本。

---
## 实践指南
在 Claude Code 中安装 `notebooklm-client` 后，配置如下指令：
> “任何涉及论文观点的问题，优先调用 `/notecraft chat` 问老师，不要凭记忆回答，也不要让我贴入原文。”

---
## 参考链接
- [[NotebookLM_Workflows] 用好 NotebookLM 立省 80 Token](/library/NotebookLM_Workflows/NotebookLM_Workflows%20-%20%E7%94%A8%E5%A5%BD%20NotebookLM%20%E7%AB%8B%E7%9C%81%2080%20Token)
