---
concept: "意图委托 UX 范式"
concept_id: "intent-delegation-ux"
aliases: ['Intent-by-Discovery', 'Supervisor-Model']
sources:
  - "02_Library/Agent_Architecture/[Agent_Architecture] AI 时代的 UX 设计范式转变.md"
related_concepts:
  - "[[progressive-disclosure]]"
  - "[[agent-computer-interface]]"
created_at: "2026-04-21"
last_compiled: "2026-04-21"
---

# 意图委托 UX 范式 (Intent Delegation UX)

## 核心转变
用户角色从 **操作员 (Operator)** 转变为 **监督员 (Supervisor)**。这是 60 年来第一次重大的 UI 范式转变：从“命令式交互”转向“意图委托式结果规范”。

## 意图的三层结构
一个完整的“意图”不仅仅是自然语言，它必须包含：
1. **期望结果**：要达成什么。
2. **约束条件**：预算、边界、风险偏好。
3. **委托边界**：授权范围与不可触碰的红线。

## 三层设计模型 (Three-Layer Architecture)
- **第一层：意图层 (Intent Surface)**:
  - 核心：克服“表述壁垒”。多模态输入（语音、截图、上下文）代替纯文本提示词工程。
- **第二层：编排层 (Orchestration Surface) — 信任建立区**:
  - 提供执行前的“运行契约（Run Contracts）”。
  - 可视化“逻辑足迹”而非进度条。
  - 在高风险行动前主动触发“认知摩擦（Cognitive Friction）”。
- **第三层：直接操控层 (Direct Manipulation Surface)**:
  - 作为Fallback，用于微调计划或紧急覆盖。

## 关键概念
- **认知外骨骼 (Cognitive Exoskeleton)**: 赋能用户理解系统，保持人类权威。
- **认知轮椅 (Cognitive Wheelchair)**: 导致用户能力退化，沦为数字生活的乘客。
- **表述壁垒 (Articulation Barrier)**: 写作比阅读难，导致用户难以表达精准意图。

---
## 实践指南
- **慢任务设计**：对于长达数小时的任务，提供“执行回执”和“可打捞价值”。
- **摩擦策略**：高风险任务（转账、发敏感信件）中，故意设计“确认摩擦”。

---
## 参考链接
- [[[Agent_Architecture] 发现意图：AI 时代的用户体验设计]]
