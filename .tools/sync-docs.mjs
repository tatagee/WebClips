/**
 * WebClips 内容同步脚本
 * 将 02_Library/, 03_Wiki/, 04_Output/ 同步到 docs/ 目录供 VitePress 构建
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');

// 源目录映射
const SYNC_MAP = [
  { src: '03_Wiki/concepts', dest: 'wiki/concepts', label: 'Wiki 概念' },
  { src: '03_Wiki/connections', dest: 'wiki/connections', label: 'Wiki 关联' },
  { src: '03_Wiki/questions', dest: 'wiki/questions', label: 'Wiki Q&A' },
  { src: '02_Library/ADK_Agent_Skills', dest: 'library/ADK_Agent_Skills', label: 'ADK Agent Skills' },
  { src: '02_Library/AI_IDE_And_CLI', dest: 'library/AI_IDE_And_CLI', label: 'AI IDE & CLI' },
  { src: '02_Library/AI_Prompt_Engineering', dest: 'library/AI_Prompt_Engineering', label: 'AI Prompt Engineering' },
  { src: '02_Library/Agent_Architecture', dest: 'library/Agent_Architecture', label: 'Agent Architecture' },
  { src: '02_Library/Agent_Course', dest: 'library/Agent_Course', label: 'Agent Course' },
  { src: '02_Library/Claude_Code_Skills', dest: 'library/Claude_Code_Skills', label: 'Claude Code Skills' },
  { src: '02_Library/Life_Strategy', dest: 'library/Life_Strategy', label: 'Life Strategy' },
  { src: '02_Library/NotebookLM_Workflows', dest: 'library/NotebookLM_Workflows', label: 'NotebookLM Workflows' },
  { src: '04_Output/summaries', dest: 'output/summaries', label: '研究报告' },
];

/**
 * 清理文件名：移除 [Category] 前缀中的方括号（VitePress 会将 [] 解析为动态路由）
 */
function sanitizeFilename(name) {
  // "[ADK_Agent_Skills] xxx.md" → "ADK_Agent_Skills - xxx.md"
  return name.replace(/^\[([^\]]+)\]\s*/, '$1 - ').replace(/%/g, 'percent');
}

/**
 * 递归复制目录中的 .md 文件
 */
function syncDir(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return 0;
  fs.mkdirSync(destPath, { recursive: true });

  let count = 0;
  const entries = fs.readdirSync(srcPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const srcFile = path.join(srcPath, entry.name);
    const safeName = sanitizeFilename(entry.name);
    const destFile = path.join(destPath, safeName);

    if (entry.isFile() && entry.name.endsWith('.md')) {
      // 读取并清理 frontmatter
      let content = fs.readFileSync(srcFile, 'utf-8');
      content = cleanFrontmatter(content, entry.name);
      fs.writeFileSync(destFile, content, 'utf-8');
      count++;
    }
  }
  return count;
}

/**
 * 清理 frontmatter，确保 VitePress 兼容
 */
function cleanFrontmatter(content, filename) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return content;

  let fm = match[1];
  let body = match[2];

  // 确保 title 字段存在
  if (!fm.includes('title:')) {
    // 从文件名提取标题（移除分类前缀和扩展名）
    let title = filename.replace(/\.md$/, '').replace(/^\[.*?\]\s*/, '');
    fm = `title: "${title}"\n${fm}`;
  }

  // 转换 Obsidian 双链 [[...]] 为 VitePress 可识别的 Markdown 链接
  // 匹配 [[链接]]，支持别名如 [[链接|别名]]，当前暂先做简单的映射
  body = body.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
    let linkTarget = p1;
    let linkLabel = p1;
    
    // 处理带别名的情况：[[链接|别名]]
    if (p1.includes('|')) {
      const parts = p1.split('|');
      linkTarget = parts[0];
      linkLabel = parts[1];
    }
    
    let linkPath = '';
    
    // 如果是指向 Library 的链接，通常带有 [Category] 前缀
    const libMatch = linkTarget.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (libMatch) {
      const category = libMatch[1];
      const title = libMatch[2];
      let safeName = `${category} - ${title}`; // 作为兜底
      
      // 尝试在真实的 Library 目录下进行模糊匹配获取准确的文件名
      // （因为用户手写的源文章引用可能丢失 .md 后缀，或者存在各种空格/特殊符号差异）
      const srcCategoryDir = path.join(ROOT, '02_Library', category);
      if (fs.existsSync(srcCategoryDir)) {
        const files = fs.readdirSync(srcCategoryDir);
        // 超级标准化函数：转小写，提取纯字母和数字，甚至忽略掉 "md" 字眼引发的错位
        const normalize = s => s.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '').replace(/md/g, '');
        const targetNorm = normalize(title);
        
        const matchedFile = files.find(f => {
          if (!f.endsWith('.md')) return false;
          let fTitle = f.replace(/^\[.*?\]\s*/, '').replace(/\.md$/, '');
          return normalize(fTitle) === targetNorm || normalize(fTitle).includes(targetNorm) || targetNorm.includes(normalize(fTitle));
        });
        
        if (matchedFile) {
          // 真正的完整文件名在这里
          safeName = sanitizeFilename(matchedFile).replace(/\.md$/, '');
        }
      }
      
      linkPath = `/library/${category}/${encodeURIComponent(safeName)}`;
    } else {
      // 否则检查 03_Wiki 下的具体目录
      if (fs.existsSync(path.join(ROOT, '03_Wiki/concepts', linkTarget + '.md'))) {
        linkPath = `/wiki/concepts/${encodeURIComponent(linkTarget)}`;
      } else if (fs.existsSync(path.join(ROOT, '03_Wiki/connections', linkTarget + '.md'))) {
        linkPath = `/wiki/connections/${encodeURIComponent(linkTarget)}`;
      } else if (fs.existsSync(path.join(ROOT, '03_Wiki/questions', linkTarget + '.md'))) {
        linkPath = `/wiki/questions/${encodeURIComponent(linkTarget)}`;
      } else {
        // 兜底指向 concepts
        linkPath = `/wiki/concepts/${encodeURIComponent(linkTarget)}`;
      }
    }
    
    return `[${linkLabel}](${linkPath})`;
  });

  return `---\n${fm}\n---\n${body}`;
}

/**
 * 读取 _log.md 提取最近活动
 */
function getRecentActivity(maxItems = 5) {
  const logPath = path.join(ROOT, '03_Wiki', '_log.md');
  if (!fs.existsSync(logPath)) return [];

  const content = fs.readFileSync(logPath, 'utf-8');
  const entries = content.match(/^## \[.*$/gm) || [];
  return entries.slice(-maxItems).reverse();
}

/**
 * 统计知识库数据
 */
function getStats() {
  const countFiles = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    return fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'INDEX.md').length;
  };

  const libraryDirs = fs.readdirSync(path.join(ROOT, '02_Library'), { withFileTypes: true })
    .filter(d => d.isDirectory());

  let totalArticles = 0;
  const categories = [];
  for (const d of libraryDirs) {
    const count = countFiles(path.join(ROOT, '02_Library', d.name));
    if (count > 0) {
      categories.push({ name: d.name, count });
      totalArticles += count;
    }
  }

  return {
    totalArticles,
    categories,
    wikiConcepts: countFiles(path.join(ROOT, '03_Wiki', 'concepts')),
    wikiConnections: countFiles(path.join(ROOT, '03_Wiki', 'connections')),
    wikiQuestions: countFiles(path.join(ROOT, '03_Wiki', 'questions')),
  };
}

/**
 * 生成侧边栏配置 JSON
 */
function generateSidebarConfig() {
  const sidebar = {};

  // Wiki 侧边栏
  const wikiItems = [];

  // Concepts
  const conceptsDir = path.join(DOCS, 'wiki', 'concepts');
  if (fs.existsSync(conceptsDir)) {
    const concepts = fs.readdirSync(conceptsDir)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const content = fs.readFileSync(path.join(conceptsDir, f), 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : f.replace('.md', '');
        return { text: title, link: `/wiki/concepts/${f.replace('.md', '')}` };
      });
    if (concepts.length) {
      wikiItems.push({ text: '📖 概念文章', collapsed: false, items: concepts });
    }
  }

  // Connections
  const connsDir = path.join(DOCS, 'wiki', 'connections');
  if (fs.existsDir !== undefined || fs.existsSync(connsDir)) {
    if (fs.existsSync(connsDir)) {
      const conns = fs.readdirSync(connsDir)
        .filter(f => f.endsWith('.md'))
        .map(f => {
          const content = fs.readFileSync(path.join(connsDir, f), 'utf-8');
          const titleMatch = content.match(/^#\s+(.+)$/m);
          const title = titleMatch ? titleMatch[1] : f.replace('.md', '');
          return { text: title, link: `/wiki/connections/${f.replace('.md', '')}` };
        });
      if (conns.length) {
        wikiItems.push({ text: '🔗 关联分析', collapsed: false, items: conns });
      }
    }
  }

  // Questions
  const questionsDir = path.join(DOCS, 'wiki', 'questions');
  if (fs.existsSync(questionsDir)) {
    const questions = fs.readdirSync(questionsDir)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const content = fs.readFileSync(path.join(questionsDir, f), 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : f.replace('.md', '');
        return { text: title, link: `/wiki/questions/${f.replace('.md', '')}` };
      });
    if (questions.length) {
      wikiItems.push({ text: '❓ Q&A 记录', collapsed: true, items: questions });
    }
  }

  sidebar['/wiki/'] = wikiItems;

  // Library 侧边栏 —— 按分类分组
  const libraryItems = [];
  const CATEGORY_LABELS = {
    'ADK_Agent_Skills': '🤖 ADK Agent Skills',
    'AI_IDE_And_CLI': '💻 AI IDE & CLI',
    'AI_Prompt_Engineering': '✍️ AI Prompt Engineering',
    'Agent_Architecture': '🏗️ Agent Architecture',
    'Agent_Course': '📚 Agent Course',
    'Claude_Code_Skills': '🧩 Claude Code Skills',
    'Life_Strategy': '🌱 Life Strategy',
    'NotebookLM_Workflows': '📓 NotebookLM Workflows',
  };

  const libBase = path.join(DOCS, 'library');
  if (fs.existsSync(libBase)) {
    const cats = fs.readdirSync(libBase, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const cat of cats) {
      const catDir = path.join(libBase, cat.name);
      const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
      if (files.length === 0) continue;

      const items = files.map(f => {
        // 从文件名提取简洁标题（去掉 "Category - " 前缀和 .md 后缀）
        let title = f.replace('.md', '').replace(/^[A-Za-z_]+ - /, '');
        if (title.length > 50) title = title.substring(0, 47) + '...';
        return { text: title, link: `/library/${cat.name}/${encodeURIComponent(f.replace('.md', ''))}` };
      });

      libraryItems.push({
        text: CATEGORY_LABELS[cat.name] || cat.name,
        collapsed: true,
        items
      });
    }
  }

  sidebar['/library/'] = libraryItems;

  // Output 侧边栏
  const outputItems = [];
  const summariesDir = path.join(DOCS, 'output', 'summaries');
  if (fs.existsSync(summariesDir)) {
    const files = fs.readdirSync(summariesDir).filter(f => f.endsWith('.md'));
    if (files.length) {
      outputItems.push({
        text: '📊 研究报告',
        collapsed: false,
        items: files.map(f => ({
          text: f.replace('.md', ''),
          link: `/output/summaries/${f.replace('.md', '')}`
        }))
      });
    }
  }
  sidebar['/output/'] = outputItems;

  return sidebar;
}

/**
 * 生成首页 index.md
 */
function generateHomepage() {
  const stats = getStats();
  const activity = getRecentActivity(5);

  const activityList = activity.length > 0
    ? activity.map(a => `> ${a.replace('## ', '')}`).join('\n>\n')
    : '> 暂无操作记录';

  // 分类卡片
  const categoryGrid = stats.categories.map(c =>
    `  - icon: 📂\n    title: ${c.name.replace(/_/g, ' ')}\n    details: ${c.count} 篇文章`
  ).join('\n');

  return `---
layout: home
hero:
  name: "WebClips"
  text: "Knowledge Wiki"
  tagline: LLM 编译的个人知识库 · 共 ${stats.totalArticles} 篇文章 · ${stats.wikiConcepts} 个概念
  actions:
    - theme: brand
      text: 浏览 Wiki →
      link: /wiki/concepts/agent-harness-pattern
    - theme: alt
      text: 浏览 Library
      link: /library/
    - theme: alt
      text: 研究报告
      link: /output/
features:
  - icon: 🧠
    title: "${stats.wikiConcepts} 个知识概念"
    details: 从 ${stats.totalArticles} 篇原始文章中提炼的核心概念，交叉引用、持续编译
  - icon: 🔗
    title: "${stats.wikiConnections} 篇关联分析"
    details: 跨概念的对比分析和关联发现，让知识形成网络
  - icon: 📚
    title: "${stats.categories.length} 个知识分类"
    details: "${stats.categories.map(c => c.name.replace(/_/g, ' ')).join(' · ')}"
  - icon: 📜
    title: 操作日志
    details: 知识库的完整演化历史，每次操作自动记录
---

<div class="activity-section">

## 📋 最近活动

${activityList}

</div>

<style>
.activity-section {
  max-width: 768px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
.activity-section blockquote {
  border-left: 3px solid var(--vp-c-brand-1);
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0 8px 8px 0;
  background: var(--vp-c-bg-soft);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
}
</style>
`;
}

/**
 * 生成 Library 和 Wiki 的入口 index 页面
 */
function generateSectionIndexes(stats) {
  // Wiki index
  const wikiIndexPath = path.join(DOCS, 'wiki', 'index.md');
  fs.mkdirSync(path.dirname(wikiIndexPath), { recursive: true });
  fs.writeFileSync(wikiIndexPath, `---
title: 🧠 Knowledge Wiki
---

# 🧠 Knowledge Wiki

> LLM 编译的结构化知识库，从原始文章中提取概念、建立关联。

## 概念文章 (${stats.wikiConcepts})

通过左侧导航浏览所有概念文章。每篇概念文章聚焦一个可独立理解的知识点，综合多篇源文章的视角。

## 关联分析 (${stats.wikiConnections})

跨概念的对比和关联分析，发现不同概念之间的内在联系。

## Q&A 记录 (${stats.wikiQuestions})

知识库问答的沉淀记录，好的答案会回流到 Wiki 形成知识复利。
`, 'utf-8');

  // Library index
  const libIndexPath = path.join(DOCS, 'library', 'index.md');
  fs.mkdirSync(path.dirname(libIndexPath), { recursive: true });

  const catTable = stats.categories.map((c, i) =>
    `| ${i + 1} | ${c.name.replace(/_/g, ' ')} | ${c.count} |`
  ).join('\n');

  fs.writeFileSync(libIndexPath, `---
title: 📚 Raw Library
---

# 📚 Raw Library

> 原始文章完整保留，按主题分类。这是知识的源头，Wiki 概念从这里编译。

## 分类统计

| # | 分类 | 文章数 |
|---|------|:------:|
${catTable}

## 浏览方式

通过左侧导航按分类浏览文章，或使用顶部搜索栏查找关键词。
`, 'utf-8');

  // Output index
  const outputIndexPath = path.join(DOCS, 'output', 'index.md');
  fs.mkdirSync(path.dirname(outputIndexPath), { recursive: true });
  fs.writeFileSync(outputIndexPath, `---
title: 📤 研究产出
---

# 📤 研究产出

> 基于知识库的研究报告、分析摘要和决策简报。

通过左侧导航浏览所有研究产出。
`, 'utf-8');
}

// ============ 主流程 ============

console.log('🔄 同步 WebClips 内容到 docs/ ...\n');

// 清理旧的 docs 内容（保留 .vitepress）
for (const sub of ['wiki', 'library', 'output']) {
  const p = path.join(DOCS, sub);
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true });
}

// 同步各目录
let totalSynced = 0;
for (const mapping of SYNC_MAP) {
  const srcPath = path.join(ROOT, mapping.src);
  const destPath = path.join(DOCS, mapping.dest);
  const count = syncDir(srcPath, destPath);
  if (count > 0) {
    console.log(`  ✅ ${mapping.label}: ${count} 篇`);
    totalSynced += count;
  }
}

// 生成统计数据
const stats = getStats();

// 生成首页
const homepage = generateHomepage();
fs.writeFileSync(path.join(DOCS, 'index.md'), homepage, 'utf-8');
console.log('  ✅ 首页已生成');

// 生成各 section 的 index
generateSectionIndexes(stats);
console.log('  ✅ 分区索引已生成');

// 生成侧边栏配置
const sidebar = generateSidebarConfig();
const sidebarPath = path.join(DOCS, '.vitepress', 'sidebar.json');
fs.mkdirSync(path.dirname(sidebarPath), { recursive: true });
fs.writeFileSync(sidebarPath, JSON.stringify(sidebar, null, 2), 'utf-8');
console.log('  ✅ 侧边栏配置已生成');

console.log(`\n✅ 同步完成！共 ${totalSynced} 篇文档。`);
