---
title: "知识编译 vs RAG (Knowledge Compilation vs RAG)"
created_at: "2026-04-04"
---

# 知识编译 vs 向量检索 (RAG)

## 核心对比
如果是万级以下的中小型个人知识库，Karpathy 推荐采用 **LLM 知识编译**，直接由大模型离线阅读、提炼、建立索引。而不是一上来就盲目上马 RAG (向量检索)。
RAG 应当作为十万级别以上数据时的补充机制，因为过度依赖切片的 RAG 会丢失宏观逻辑。
