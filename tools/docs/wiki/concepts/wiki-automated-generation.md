---
title: "wiki-automated-generation"
concept: "Wiki Automated Generation"
concept_id: "wiki-automated-generation"
aliases: ['Wiki-Compilation-Logic', '自动化 Wiki']
sources:
  - "02_Library/Claude_Code_Skills/[Claude_Code_Skills] wiki-gen-skill.md"
related_concepts:
  - "[[llm-augmented-wiki]]"
  - "[[skill-lifecycle]]"
created_at: "2026-04-07"
last_compiled: "2026-04-07"
---

# Wiki Automated Generation (Wiki 自动化生成)

## 逻辑链路
通过 Agent Skill 实现“剪藏库 (Library) -> 知识库 (Wiki)”的自动化蒸馏。

## 核心流程
1. **内容扫描**：使用 `grep` 或 `list_dir` 寻找 `compiled: false` 的文章。
2. **意图蒸馏**：LLM 阅读全文，提取核心概念 (Concepts) 和模式 (Patterns)，而非全量摘要。
3. **元数据对齐**：自动生成符合 Wiki 规范的 YAML Frontmatter（包括 `concept_id`, `aliases` 等）。
4. **冲突检测**：检查新概念是否与现有 Wiki 页面重合，并决定是 **[New]** 还是 **[Merge]**。
5. **双向索引更新**：
    - 将新路径加入 `03_Wiki/_index.md`。
    - 将源文章标记为 `✅` 并移动分类。
    - 在 `_log.md` 记录操作历史。

## 关键代码段 (SOP)
```bash
/compile-wiki --file "Article_Name.md" --mode focus
```
*(逻辑来源于 wiki-gen-skill.md 内部定义的 Workflow)*

---
## 实践指南
- **流水线调试**：如果 `/compile-wiki` 产生幻觉，检查 `PROMPT_TEMPLATES` 是否过时。2026 年的模型对“深度关系提取”有极强的偏好，应在模板中增加对 `related_concepts` 的强制要求。
- **清理逻辑**：在自动生成后，建议通过 `git status` 审查变更。如果产生空文件或元数据错误的页面，优先撤销并更新蒸馏 Prompt，而非手动修复单个文件。
- **构建触发**：建议将 `npm run docs:build` 集成为 Git Hook，确保 Wiki 内容与发布站点实时同步。

---
## 参考链接
- [[Claude_Code_Skills] wiki-gen-skill](/library/Claude_Code_Skills/Claude_Code_Skills%20-%20wiki-gen-skill)
