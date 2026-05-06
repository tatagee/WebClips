---
title: "agent-modular-architecture"
concept: "智能体核心模块架构"
concept_id: "agent-modular-architecture"
aliases: ['Hermes-Components', 'Agent-Toolchain']
sources:
  - "02_Library/AI_IDE_And_CLI/[AI_IDE_And_CLI] Hermes 全部高阶工具配置.md"
related_concepts:
  - "[[agent-harness-pattern]]"
  - "[[skill-lifecycle]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# 智能体核心模块架构 (Modular Agent Framework)

## 核心组件定义
一个成熟的 2026 智能体（如 Hermes）不再是简单的 Prompt 包装，而是高度解耦的模块化系统。

### 1. 身份层 (Identity - SOUL.md)
- 负责：定义人格、语气边界、核心任务设定。
- 进阶：动态迭代。模型根据对话反馈，自行更新其 SOUL 配置文件。

### 2. 记忆层 (Memory - Hindsight)
- 负责：跨 Session 的状态持久化。
- 关键特征：实体与关系提取。自动识别对话中的“任务截止日”、“偏好”等实体并建立图谱关联，而非简单的文本存储。

### 3. 感知层 (Perception - Skills)
- **抓取 & 深度爬取**：从单页抓取 (Jina Reader) 到结构化全域爬取 (Crawl4AI)。
- **文档转化**：Pandoc/Marker 实现全格式（PDF/DOCX/LaTeX）到 Markdown 的无损转化。
- **环境操作**：具备反爬能力的隐身浏览器控制。

### 4. 进化层 (Evolution)
- 负责：Prompt 与 Skill 的自我优化。
- 特性：基于遗传算法或反馈循环，自动优化其 Tools 的描述文本和调用逻辑。

---
## 实践指南
- **配置优先级**：身份 (Soul) > 感知 (Perception) > 记忆 (Memory) > 进化 (Evolution)。
- **协同策略**：使用 tokscale 等监控工具，分析各模块对 Token 消耗的贡献度，精准执行“分页（Paging）”。

---
## 参考链接
- [[AI_IDE_And_CLI] Hermes 全部高阶工具配置](/library/AI_IDE_And_CLI/AI_IDE_And_CLI%20-%20Hermes%20%E5%85%A8%E9%83%A8%E9%AB%98%E9%98%B6%E5%B7%A5%E5%85%B7%E9%85%8D%E7%BD%AE)
