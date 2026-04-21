---
concept: "Claude Code Mastery"
concept_id: "claude-code-mastery"
aliases: ['Claude-Code-技巧', 'CLI-Efficiency']
sources:
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] Claude Code 完全リファレンス — 全機能網羅+意外と知らない便利機能トップ10.md"
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] 【入門記事】ClaudeCodeの中級者になりたい人は集合してください.md"
related_concepts:
  - "[[skill-lifecycle]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Claude Code Mastery (进阶技巧)

## 提升效率的 Top 10 功能

1. **`/btw` (Side Question)**：在不污染主对话上下文的情况下提问。它利用 Prompt Cache 降低成本，适合询问术语或轻量概念。
2. **`Ctrl+S` (Stash)**：暂存当前正在编写的 Prompt，处理紧急任务后再自动恢复。
3. **`Ctrl+B` (Background)**：将长耗时任务（如运行全量测试）移至后台，主终端继续接收指令。
4. **`--bare` (轻量模式)**：跳过所有 Hook、LSP 和初始化插件，实现秒级启动，适合 CI/CD 或单次脚本调用。
5. **`/loop` (循环执行)**：在本地以指定间隔运行命令（如每 5 分钟跑一次测试），最长可运行 3 天。
6. **`!Command` (Shell 直达)**：在指令前加 `!` 绕过 LLM 推论直接执行系统命令，节省 Token。
7. **`/rewind` (撤销)**：一键撤销 Claude 刚才产生的所有文件系统修改。
8. **`/compact` (上下文压缩)**：当 Token 接近 80% 时，用摘要替换冗长对话记录以释放空间。
9. **`worktree.sparsePaths`**：在大规模 Monorepo 中仅加载相关目录，显著提升启动速度。
10. **`Ctrl+G` (外部编辑器)**：调用 `$EDITOR` (如 Vim/VS Code) 编写复杂的结构化 Prompt。

## 实战建议
- **权限管理**：建议使用 `acceptEdits` 模式允许文件修改自动通过，但保留命令执行确认。
- **自动化集成**：结合 `-p` (非交互模式) 和 `--output-format json` 构建自动化工作流。

---
## 实践指南
- **成本控制**：在长 Session 结尾使用 `Ctrl+W` 或 `/compact` 及时重置上下文。
- **自动化流**：配置别名 `alias c="claude-code -p \"$@\""`，实现命令行级的高效调用。
- **插件维护**：定期清理不常用的 MCP 服务器，过多的工具描述会显著拉高每个 Token 的 Prompt 成本。

---
## 参考链接
- [[[AI_IDE_And_CLI] Claude Code 完全リファレンス]]
- [[[AI_IDE_And_CLI] 【入門記事】ClaudeCodeの中級者になりたい人は集合してください]]
