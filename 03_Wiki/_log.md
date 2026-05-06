# 📜 WebClips 操作日志
> Append-only 操作记录 | 由各工作流自动维护
> 用法: `grep "^## \[" _log.md | tail -10` 查看最近 10 条操作

---

## [2026-04-04] compile | 初始编译 26 篇文章
- 新建概念: agent-harness-pattern, agents-vs-skills, skill-design-patterns, progressive-disclosure, autoresearch-method, llm-knowledge-compilation
- 新建关联: knowledge-compilation-vs-rag
- 新建 Q&A: 2026-04-04-skills-vs-mcp

## [2026-04-04] lint | 健康评分 7/10
- 报告: 04_Output/lint-report-2026-04-04.md

## [2026-04-07] organize | 7 篇文章入库
- 新增分类: AI_Prompt_Engineering
- 入库文章:
  - [AI_IDE_And_CLI] Claude Code 完全リファレンス
  - [AI_Prompt_Engineering] I stopped hitting Claude's usage limits
  - [AI_IDE_And_CLI] Is the IDE dead_
  - [ADK_Agent_Skills] Production-grade engineering skills for AI coding agents
  - [NotebookLM_Workflows] llm-wiki
  - [Claude_Code_Skills] wiki-gen-skill
  - [AI_IDE_And_CLI] 【入門記事】ClaudeCodeの中級者になりたい人は集合してください

## [2026-04-07] query | Karpathy LLM Wiki 最佳实践分析
- 输出: 04_Output/summaries/2026-04-07-Karpathy-LLM-Wiki-Best-Practice.md

## [2026-04-07] query | Karpathy 理念 vs WebClips 差距分析
- 输出: 04_Output/summaries/2026-04-07-Karpathy-LLM-Wiki-Gap-Analysis.md
- 识别 5 个差距，触发 P0-P3 工作流优化

## [2026-04-07] workflow-upgrade | P0-P3 工作流优化
- P0: 新增 03_Wiki/_log.md；4 个工作流增加自动日志追加步骤
- P1: /compile-wiki 增加 Step 4.4 交叉回扫（Cross-Scan）
- P2: /query-wiki Step 5 Q&A 回流从"可选"→"推荐默认"
- P3: /organize-webclips 增加 ARCHITECTURE.md 联动自动更新
- 同步更新 ARCHITECTURE.md 分类表和变更日志

## [2026-04-07] site-build | 知识库静态网站上线
- 技术栈: VitePress 1.6 + sync-docs.mjs
- 新增文件: package.json, docs/.vitepress/config.mts, .tools/sync-docs.mjs, .gitignore
- 功能: 首页统计、Wiki/Library/Output 三区浏览、全文搜索、暗色模式
- 同步文档: 43 篇（33 Library + 8 Wiki + 2 Output）
- 工作流集成: organize-webclips Step 7 和 compile-wiki Step 6 增加构建提示

## [2026-04-07] organize | 1 篇文章入库
- 入库文章:
  - [Agent_Architecture] Building Effective AI Agents

## [2026-04-07] compile | 全量编译 8 篇文章
- 新建概念: workflows-vs-agents, agentic-patterns, augmented-llm, agent-computer-interface, skill-lifecycle, claude-code-mastery, ide-evolution, context-optimization, wiki-automated-generation, llm-augmented-wiki
- 更新概念: agent-harness-pattern (整合 Anthropic 原则)
- 新建关联: workflows-vs-agents (架构对比分析)
- 覆盖原始文章: 34 / 34 (100% 编译完成)

## [2026-04-07] lint | 健康评分 9/10
- 报告: 04_Output/lint-report-2026-04-07.md
- 关键发现: 编译覆盖率达 100%，但早期概念存在“知识孤岛”现象，需要加强跨概念关联。

## [2026-04-18] organize | 9 篇文章入库
- 新增分类: (无)
- 入库文章:
  - [Claude_Code_Skills] Google engineer automated 80% of his work with Claude Code. here's the exact system he built.
  - [Agent_Architecture] Hermes Agent 从中级到高级进阶指南
  - [AI_Prompt_Engineering] How to set up Claude Cowork (the April 2026 update):
  - [Agent_Architecture] Multi-agent coordination patterns: Five approaches and when to use them
  - [ADK_Agent_Skills] My AI-Assisted workflow
  - [AI_Prompt_Engineering] Prompting is the worst way to use Claude. Do this instead:
  - [AI_IDE_And_CLI] Run multiple agents at once with /fleet in Copilot CLI
  - [Agent_Architecture] Why Your “AI-First” Strategy Is Probably Wrong
  - [Agent_Architecture] 三省六部幻觉：为什么"虚拟公司"式多Agent架构在工程上不成立

## [2026-04-18] compile | 全量编译 9 篇文章
- 新建概念 (16个): ai-assisted-workflow, vertical-slice-issues, narrow-scope-ai-review, multi-agent-orchestrator, artifact-driven-decomposition, anti-ai-writing-style, obsidian-as-second-brain, generator-verifier-pattern, agent-teams-pattern, message-bus-pattern, shared-state-pattern, ai-native-ci-cd, self-healing-feedback-loop, role-based-agent-anti-pattern, explicit-external-state, karpathy-claude-rules, claude-code-agent-os, agent-curated-memory, memory-nudge-mechanism
- 更新概念: context-optimization, agent-harness-pattern, skill-lifecycle
- 新建关联 (2个): role-based-vs-capability-decomposition, harness-vs-state-memory
- 覆盖原始文章: 43 / 43 (100% 编译完成)

## [2026-04-21] organize | 7 篇文章入库
- 新增分类: (无)
- 入库文章:
  - [Agent_Architecture] AI Cybersecurity After Mythos: The Jagged Frontier
  - [Agent_Architecture] How Complex is my Code?
  - [AI_IDE_And_CLI] How I run 10K MRR on 20 budget
  - [AI_IDE_And_CLI] 一文理清！Hermes 全部高阶工具配置
  - [Agent_Architecture] 发现意图：AI 时代的用户体验设计
  - [AI_Prompt_Engineering] 搞懂缓存机制，从Gemma4到Claude Code省80%Token
  - [NotebookLM_Workflows] 用好NotebookLM立省80%Token

## [2026-04-21] lint | 健康评分 8.5/10
- 报告: 04_Output/lint-report-2026-04-21.md
- 关键发现: 识别出 3 个未索引概念及 10 处缺失的实践指南；新入库文章与上下文优化概念存在强关联。

## [2026-05-06] organize | 5 篇文章入库
- 新增分类: (无)
- 入库文章:
  - [Claude_Code_Skills] 21 Things most claude users have Never Set Up and It's Costing them Hours Every Week
  - [Claude_Code_Skills] I Tried 100+ Claude Code Skills. These 6 Are The Best
  - [Agent_Architecture] What to Learn, Build, and Skip in AI Agents (2026)
  - [Agent_Architecture] 从一个 Agent 到一支队伍：Hermes 多 Agent 部署流程
  - [Claude_Code_Skills] 优化这七个Token消耗陷阱，你的Claude Code可以多用三倍

## [2026-05-06] compile | 增量编译 6 篇文章
- 新建概念 (5个): notebooklm-as-rag, claude-code-overhead, hermes-agent-framework, orchestrator-subagent-pattern, agent-evals
## [2026-05-06] lint | 健康评分 10/10
- 报告: 04_Output/lint-report-2026-05-06.md
- 关键发现: 编译覆盖率 100%，无未编译文章。发现概念 notebooklm-as-rag 与 claude-code-overhead 具有潜在关联。
