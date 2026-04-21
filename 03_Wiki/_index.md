# 🧠 WebClips Knowledge Wiki
> LLM 编译的知识库 | 最后编译: 2026-04-21 | 共 41 个概念

## 关于本 Wiki

本目录是由 LLM 从 `02_Library/`（原始文章）编译生成的结构化知识库。

- **concepts/** — 核心概念文章（每个文件聚焦一个可独立理解的知识点）
- **connections/** — 跨概念关联分析文章
- **questions/** — Q&A 问答记录（知识回流）

### 使用方式
- 运行 `/compile-wiki` → 从原始文章编译新概念到本 Wiki
- 运行 `/query-wiki` → 对 Wiki 提出研究问题
- 运行 `/lint-wiki` → 对 Wiki 进行健康检查

## 概念目录

### 按分类

#### Agent & Skills
| 概念 | 文件 | 来源数 | 最后编译 |
|------|------|:------:|---------|
| 工作流 vs 智能体 | [[workflows-vs-agents]] | 1 | 2026-04-21 |
| 智能体设计模式 | [[agentic-patterns]] | 1 | 2026-04-21 |
| Agent Harness 模式 | [[agent-harness-pattern]] | 4 | 2026-04-21 |
| 增强型 LLM | [[augmented-llm]] | 1 | 2026-04-21 |
| 智能体接口 (ACI) | [[agent-computer-interface]] | 1 | 2026-04-21 |
| 技能生命周期 | [[skill-lifecycle]] | 2 | 2026-04-21 |
| 指令 vs 技能 | [[agents-vs-skills]] | 1 | 2026-04-21 |
| 技能设计模式 | [[skill-design-patterns]] | 1 | 2026-04-21 |
| 渐进式披露 | [[progressive-disclosure]] | 1 | 2026-04-21 |
| Multi-Agent Orchestrator | [[multi-agent-orchestrator]] | 1 | 2026-04-21 |
| 产物驱动分解 | [[artifact-driven-decomposition]] | 1 | 2026-04-21 |
| 生成-验证者模式 | [[generator-verifier-pattern]] | 1 | 2026-04-21 |
| 智能体小队模式 | [[agent-teams-pattern]] | 1 | 2026-04-21 |
| 消息总线模式 | [[message-bus-pattern]] | 1 | 2026-04-21 |
| 共享状态模式 | [[shared-state-pattern]] | 1 | 2026-04-21 |
| 角色划分反模式 | [[role-based-agent-anti-pattern]] | 1 | 2026-04-21 |
| 显式外部状态记忆 | [[explicit-external-state]] | 1 | 2026-04-21 |
| Agent 策展式记忆 | [[agent-curated-memory]] | 1 | 2026-04-21 |
| 记忆干预与整理机制 | [[memory-nudge-mechanism]] | 1 | 2026-04-21 |

#### IDE & Tooling
| 概念 | 文件 | 来源数 | 最后编译 |
|------|------|:------:|---------|
| Claude Code 进阶 | [[claude-code-mastery]] | 2 | 2026-04-21 |
| IDE 的演进 | [[ide-evolution]] | 1 | 2026-04-21 |
| 自动研究法 | [[autoresearch-method]] | 1 | 2026-04-21 |
| LLM 知识编译 | [[llm-knowledge-compilation]] | 1 | 2026-04-21 |
| AI 辅助工作流 | [[ai-assisted-workflow]] | 1 | 2026-04-21 |
| 垂直切片交付问题 | [[vertical-slice-issues]] | 1 | 2026-04-21 |
| 窄作用域 AI 审查 | [[narrow-scope-ai-review]] | 1 | 2026-04-21 |
| 反 AI 提示文体 | [[anti-ai-writing-style]] | 1 | 2026-04-21 |
| Obsidian 作为第二大脑 | [[obsidian-as-second-brain]] | 1 | 2026-04-21 |
| Karpathy 的 Claude 规则 | [[karpathy-claude-rules]] | 1 | 2026-04-21 |
| 代理能力扩展库架构 | [[claude-code-agent-os]] | 1 | 2026-04-21 |
| 智能体核心模块架构 | [[agent-modular-architecture]] | 1 | 2026-04-21 |
| 极简 AI 启动栈 | [[lean-ai-stack-bootstrapping]] | 1 | 2026-04-21 |

#### 优化与自动化
| 概念 | 文件 | 来源数 | 最后编译 |
|------|------|:------:|---------|
| 上下文配额优化 | [[context-optimization]] | 4 | 2026-04-21 |
| NotebookLM RAG 编排模式 | [[notebooklm-rag-orchestration]] | 1 | 2026-04-21 |
| 意图委托 UX 范式 | [[intent-delegation-ux]] | 1 | 2026-04-21 |
| 能力锯齿边缘与安全机制 | [[jagged-frontier-security]] | 1 | 2026-04-21 |
| 语言学代码复杂度 | [[linguistic-code-complexity]] | 1 | 2026-04-21 |
| Wiki 自动化生成 | [[wiki-automated-generation]] | 1 | 2026-04-21 |
| LLM 增强知识库 | [[llm-augmented-wiki]] | 1 | 2026-04-21 |
| AI 原生 CI/CD | [[ai-native-ci-cd]] | 1 | 2026-04-21 |
| 自愈反馈闭环 | [[self-healing-feedback-loop]] | 1 | 2026-04-21 |

## 关联文章

| 关联 | 文件 | 说明 |
|------|------|------|
| 工作流对比智能体 | [[workflows-vs-agents]] | 关于预定义路径与动态决策的深度对比 |
| 知识编译 vs 向量检索 (RAG) | [[knowledge-compilation-vs-rag]] | 大小规模知识库的检索架构对比 |
| 重构分工：角色的消亡与能力的兴起 | [[role-based-vs-capability-decomposition]] | 角色伪命题验证及由能力代替角色的分析 |
| 在失忆中长存：外部状态如何支撑 Agent | [[harness-vs-state-memory]] | Harness 与外化文本记录的联系揭秘 |
| 成本博弈：缓存命中 vs. RAG 引擎 | [[caching-vs-rag-economics]] | 深度对比 Prompt Cache 与 NotebookLM RAG 的经济效益 |

## 快速统计
- 总概念数: 41
- 总关联文章: 5
- 覆盖原始文章: 50 / 50
