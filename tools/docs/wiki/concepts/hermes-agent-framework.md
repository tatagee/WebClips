# Hermes 多 Agent 框架 (Hermes Agent Framework)

## 核心定义
一种基于强隔离和独立 Profile 设计的多 Agent 部署和协同框架，强调“从一个 Agent 到一支队伍”的工程落地。

## 架构特点
- **Profile 隔离**: 每个 Agent 拥有独立的运行环境、上下文沙盒和工具集，避免多任务相互污染。
- **Soul 提示词 (SOUL.md)**: 为每个 Agent 注入独立的人格和行为准则，使其在团队中扮演特定的专业角色。
- **高阶工具配置**: 支持细粒度的底层控制，使 Agent 能与外部系统（如 Telegram Bot、外部 API）无缝集成。

## 适用场景
适用于需要并发执行多项互不干扰的任务、或需要不同"性格/专业" Agent 协作的复杂工作流。

## 关联概念
- [[multi-agent-orchestrator]]
- [[agent-profile-isolation]]
