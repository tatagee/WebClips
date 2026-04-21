# WebClips Frontmatter 标准模板

> 所有入库文章必须包含以下标准化 YAML frontmatter。
> 工作流 `/organize-webclips` 会在分类时自动校验并补全缺失字段。

## 模板

```yaml
---
title: "文章标题"                    # 必填 - 文章原始标题
source: "https://原文URL"            # 必填 - 原始来源 URL
clipped_at: "2026-04-04"            # 自动填充 - 剪藏/入库日期（ISO 格式）
category: "[分类标签]"               # 自动填充 - 由 /organize-webclips 确定
tags: ["keyword1", "keyword2"]       # 自动填充 - 3-5 个关键词，LLM 从内容中提取
status: "raw"                        # 自动管理 - 文章在知识管理管线中的状态
compiled: false                      # 自动管理 - 是否已编译到 03_Wiki/
---
```

## 字段说明

### `status` 状态机

```
raw → highlighted → distilled → expressed
```

| 状态值 | 含义 | 触发时机 |
|:------:|:----:|:---------|
| `raw` | 刚入库的原始文章 | `/organize-webclips` 归档时 |
| `highlighted` | 已提取关键段落 | `/compile-wiki` 编译时 |
| `distilled` | 已提炼为 Wiki 概念文章 | `/compile-wiki` 完成后 |
| `expressed` | 已产出研究报告/幻灯片 | `/query-wiki` 输出后 |

### `compiled` 编译状态

| 值 | 含义 |
|:--:|:-----|
| `false` | 尚未编译到 `03_Wiki/` |
| `true` | 已被编译（概念已提取到 Wiki） |

### `tags` 标签规则
- 保留 3-5 个最具辨识度的关键词
- 使用英文小写，多词用连字符（如 `agent-skills`）
- 标签应能支持跨分类检索（即使文章只归入一个主分类）

## 分类标签速查

| 标签 | 适用范围 |
|:----:|:---------|
| `[ADK_Agent_Skills]` | Google ADK 框架、Agent Skills 规范、技能设计模式 |
| `[Claude_Code_Skills]` | Claude Code 技能设计、Prompt 优化、团队分发 |
| `[Agent_Architecture]` | Agent 架构评估、Harness 设计、主动 vs 被动上下文 |
| `[NotebookLM_Workflows]` | NotebookLM、MCP 集成、BASB 个人知识管理 |
| `[AI_IDE_And_CLI]` | Antigravity IDE、Gemini CLI 入门、实战、安全 |
| `[Agent_Course]` | AI Agent 系统性课程、全栈构建指南 |
| `[Life_Strategy]` | 个人成长、行为心理学、生产力哲学 |
