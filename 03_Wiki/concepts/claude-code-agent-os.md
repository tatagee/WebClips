---
concept: "代理能力扩展库架构"
concept_id: "claude-code-agent-os"
aliases: ["Everything Claude Code", "Agent OS"]
sources:
  - "02_Library/Claude_Code_Skills/[Claude_Code_Skills] Google engineer automated 80% of his work with Claude Code. here's the exact system he built..md"
related_concepts:
  - "[[claude-code-mastery]]"
created_at: "2026-04-18"
last_compiled: "2026-04-18"
---

# 代理能力扩展库架构 (Claude Code Agent OS)

## 定义
在 Claude Code 等 CLI 工具外壳之上，通过引入一组专门规划的“角色定义插件”和“技能动作集”构成一整套类似操作系统的应用生态。

## 核心要点
- **能力高度模块化**：诸如 TDD、代码 Review、架构设计分别有专有的 `.md` 引导和相应的终端技能集成。（来源：[[[Claude_Code_Skills] Google engineer automated 80% of his work with Claude Code. here's the exact system he built..md]]）
- **按需加载防撑爆**：这种架构需要极度关注上下文耗损（如 20k Token bug 的膨胀危机），绝不能一次性导入全部插件，必须根据当前上下文精确抽取。

## 实践指南
当需要构建完全自动化的工作流（如接收代码请求、拉取分支、测试合并的流水线）时，利用模块化的套件库比完全从头给 AI 手打 Prompt 有数百倍的效率提升。

## 关联概念
- [[claude-code-mastery]] — 高阶环境配置技巧。
