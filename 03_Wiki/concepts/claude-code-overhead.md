# Claude Code 上下文开销 (Claude Code Overhead)

## 核心定义
在使用 Claude Code 等 CLI AI 助手时，由于配置不当或隐藏机制导致的不必要的 Token 消耗。

## 消耗陷阱
- **冗余的 Plugin Hooks**: 每次提问或会话启动时自动注入的环境信息（如 `UserPromptSubmit`, `SessionStart`）。未清理的 Hooks 会在每次对话中成倍消耗 Input Token。
- **庞大的 CLAUDE.md**: 过长或包含大量无关上下文的系统指令，会占用每轮对话的基础窗口。
- **MCP 连接过多**: 连接的 MCP Server 如果在当前任务中不需要，其暴露的 Tool Schema 依然会占用大量 Token。

## 优化策略
- 定期审计并禁用不必要的 Plugin Hooks (`/plugin disable <plugin-name>`)。
- 动态管理 MCP Servers (`/mcp disable <server>`)。
- 保持 `CLAUDE.md` 精简，使用指令链或 Skill 动态加载需要的上下文。

## 关联概念
- [[context-optimization]]
- [[token-consumption-traps]]
