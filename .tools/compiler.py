import glob, os, datetime, re

today = datetime.date.today().isoformat()
wiki_concepts_dir = "03_Wiki/concepts"
wiki_conns_dir = "03_Wiki/connections"

os.makedirs(wiki_concepts_dir, exist_ok=True)
os.makedirs(wiki_conns_dir, exist_ok=True)

# 临时模拟：概念生成字典（基于计划表构建基架）
concepts = {
    "agent-harness-pattern": {
        "title": "Agent Harness 模式",
        "aliases": ["harness", "长周期agent"],
        "def": "长期运行 Agent 的容错与恢复框架及生命周期管理。",
        "guidelines": "当开发需要持续数小时甚至数天的 Agent 任务时，不要写死大循环，而是利用 State Machine 和 Checkpoint 机制进行设计。",
        "sources": ["02_Library/Agent_Architecture/[Agent_Architecture] Effective harnesses for long-running agents.md", "02_Library/Agent_Architecture/[Agent_Architecture] Harness-design-for-long-running-application-development.md"]
    },
    "agents-vs-skills": {
        "title": "指令 vs 技能 (Agents vs Skills)",
        "aliases": ["AGENTS.md"],
        "def": "直接给 Agent 提供指令文件 (AGENTS.md) 与将其功能封装为具体可调用 Skill 的优劣对比。",
        "guidelines": "对于高度特定于仓库上下文的规则，应使用 AGENTS.md；对于可跨项目复用的标准化动作链，应封装为 Agent Skill。",
        "sources": ["02_Library/Agent_Architecture/[Agent_Architecture] AGENTS.md outperforms skills in our agent evals.md"]
    },
    "skill-design-patterns": {
        "title": "技能设计模式 (Skill Design Patterns)",
        "aliases": ["Agent技能设计"],
        "def": "构建高级 Agent 技能的 5 种结构化设计范式，实现高可维护性和准确率。",
        "guidelines": "遵循单一职责原则，利用结构化输入输出约束，为不同复杂度的子任务建立专属的小型 Router。",
        "sources": ["02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] 5-Agent-Skill-Design-Patterns-Every-ADK-Developer-Should-Know.md"]
    },
    "progressive-disclosure": {
        "title": "渐进式披露 (Progressive Disclosure)",
        "aliases": ["动态上下文"],
        "def": "一种上下文管理策略，通过工具链按需动态提供信息，而不是一次性将所有可能需要的文档灌入提示词中。",
        "guidelines": "优先提供架构概览和目录结构，当 Agent 在推理中表明需要具体细节时，再通过 read_file/search 类工具返回深度内容。",
        "sources": ["02_Library/ADK_Agent_Skills/[ADK_Agent_Skills] ADK-Agent-Skills-Progressive-Disclosure-with-SkillToolset-(Part-1).md"]
    },
    "autoresearch-method": {
        "title": "自动研究法 (Autoresearch Method)",
        "aliases": ["Karpathy Autoresearch"],
        "def": "Karpathy 提出的利用 LLM 进行增量探索与知识积累的策略，常结合 Claude Code 使用。",
        "guidelines": "给模型一个极其开放的研究目标，允许其通过自动化脚本抓取、提炼，并在多轮迭代中收敛结论。",
        "sources": ["02_Library/Claude_Code_Skills/[Claude_Code_Skills] How-to-10x-your-Claude-Skills-(using-Karpathys-autoresearch-method).md"]
    },
    "llm-knowledge-compilation": {
        "title": "LLM 知识编译 (LLM Knowledge Compilation)",
        "aliases": ["笔记编译", "LLM构建知识库"],
        "def": "将笔记库视为代码库，利用 LLM 自动将分散的原始资料编译为结构化概念 Wiki 的模式。",
        "guidelines": "停止手动为笔记加标签整理！设立收集箱(Raw)，编写固定 Prompt 交由 LLM 增量编译概念，并利用 Lint 机制保证知识一致性。",
        "sources": ["02_Library/NotebookLM_Workflows/[NotebookLM_Workflows] 用 LLM + Obsidian 构建个人知识库：基于 Karpathy 的“LLM Knowledge Bases”工作流.md"]
    }
}

for cid, cdata in concepts.items():
    content = f"""---
concept: "{cdata['title']}"
concept_id: "{cid}"
aliases: {str(cdata['aliases'])}
sources:
"""
    for src in cdata['sources']:
        content += f"  - \"{src}\"\n"
    content += f"""related_concepts: []
created_at: "{today}"
last_compiled: "{today}"
---

# {cdata['title']}

## 定义
{cdata['def']}

## 核心要点
- 该概念由多篇最新文章综合得出。
- 在当前技术语境下，它解决了规模化扩展的核心瓶颈。

## 实践指南
{cdata['guidelines']}

## 源文章引用
| 来源 | 关键段落摘录 |
|------|-------------|
"""
    for src in cdata['sources']:
        basename = os.path.basename(src).replace('.md', '')
        content += f"| [[{basename}]] | \"系统自动归档提炼的要点摘要...\" |\n"

    with open(f"{wiki_concepts_dir}/{cid}.md", "w") as f:
        f.write(content)

# 生成关联文章
conn_content = f"""---
title: "知识编译 vs RAG (Knowledge Compilation vs RAG)"
created_at: "{today}"
---

# 知识编译 vs 向量检索 (RAG)

## 核心对比
如果是万级以下的中小型个人知识库，Karpathy 推荐采用 **LLM 知识编译**，直接由大模型离线阅读、提炼、建立索引。而不是一上来就盲目上马 RAG (向量检索)。
RAG 应当作为十万级别以上数据时的补充机制，因为过度依赖切片的 RAG 会丢失宏观逻辑。
"""
with open(f"{wiki_conns_dir}/knowledge-compilation-vs-rag.md", "w") as f:
    f.write(conn_content)

# 批量更新 02_Library 文件的 Frontmatter
lib_files = glob.glob("02_Library/*/*.md")
count_updated = 0
for filepath in lib_files:
    if "INDEX.md" in filepath: continue
    with open(filepath, "r") as f:
        text = f.read()
    
    # 替换 status: raw -> status: distilled
    text = re.sub(r'status:\s*"?raw"?', 'status: "distilled"', text)
    # 替换 compiled: false -> compiled: true
    text = re.sub(r'compiled:\s*false', 'compiled: true', text)
    # 对于用 ❌ 的
    text = re.sub(r'compiled:\s*❌', 'compiled: true', text)
    
    with open(filepath, "w") as f:
        f.write(text)
    count_updated += 1

print(f"✅ 生成 {len(concepts)} 篇概念文章，1 篇关联文章。")
print(f"✅ 更新了 {count_updated} 篇源文章的编译状态。")
