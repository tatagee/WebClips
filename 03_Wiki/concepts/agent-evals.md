# Agent 评估 (Agent Evals)

## 核心定义
在构建 AI Agent 时，用于衡量和验证其行为、工具调用准确率以及任务完成率的系统化评估基准。

## 为什么重要
- 在快速迭代的 Agent 框架中，没有 Eval 就等于“盲飞”。
- 帮助开发者区分“表面看起来工作”与“在边缘场景依然稳定”。
- 它是将 Agent 从玩具 (Toy) 变成生产级工具 (Production-grade) 的关键分水岭。

## 实践要点
- 针对 Agent 的每项核心 Skill 构建测试用例集。
- 引入自动化评估流程，在修改 Prompt 或工具 Schema 后即刻运行。
- 不要只关注成功率，同时衡量 Token 消耗量、调用耗时等效率指标。

## 关联概念
- [[durable-agent-primitives]]
- [[agent-architecture]]
