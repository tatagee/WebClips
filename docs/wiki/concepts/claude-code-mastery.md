---
title: "claude-code-mastery"
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
- [[AI_IDE_And_CLI] Claude Code 完全リファレンス](/library/AI_IDE_And_CLI/AI_IDE_And_CLI%20-%20Claude%20Code%20%E5%AE%8C%E5%85%A8%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9%20%E2%80%94%20%E5%85%A8%E6%A9%9F%E8%83%BD%E7%B6%B2%E7%BE%85%2B%E6%84%8F%E5%A4%96%E3%81%A8%E7%9F%A5%E3%82%89%E3%81%AA%E3%81%84%E4%BE%BF%E5%88%A9%E6%A9%9F%E8%83%BD%E3%83%88%E3%83%83%E3%83%9710)
- [[AI_IDE_And_CLI] 【入門記事】ClaudeCodeの中級者になりたい人は集合してください](/library/AI_IDE_And_CLI/AI_IDE_And_CLI%20-%20%E3%80%90%E5%85%A5%E9%96%80%E8%A8%98%E4%BA%8B%E3%80%91ClaudeCode%E3%81%AE%E4%B8%AD%E7%B4%9A%E8%80%85%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%9F%E3%81%84%E4%BA%BA%E3%81%AF%E9%9B%86%E5%90%88%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)
