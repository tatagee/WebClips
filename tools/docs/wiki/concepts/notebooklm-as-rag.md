# NotebookLM 作为 RAG 引擎 (NotebookLM as RAG)

## 核心定义
将 Google NotebookLM 作为外置的静态知识库和 RAG (Retrieval-Augmented Generation) 引擎，与主 Agent (如 Claude) 解耦，以极大降低长上下文对话的 Token 开销。

## 关键特征
- **成本倒置**: NotebookLM 的存储和检索免费，替代了将大量语料强塞入 Claude 导致的线性 Input Token 成本。
- **职责分离**: NotebookLM 负责「找事实」和「加引用」，Claude 负责「逻辑推理」和「工具调度」。
- **静态边界**: 适合 Reading List、招股书等静态长文本资料，规避大模型外部幻觉。

## 典型场景
通过 `notebooklm-client` 或类似工具将 NotebookLM 封装为一个 Skill，使 Claude 在需要领域知识时自主通过命令行查询 NotebookLM，从而实现复杂的投研或文献综述工作流。

## 关联概念
- [[rag-vs-context-cost]]
- [[llm-knowledge-compilation]]
- [[claude-notebooklm-integration]]
