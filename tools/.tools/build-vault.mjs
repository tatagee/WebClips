import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const VAULT = path.resolve(__dirname, '../../05_Vault');

const SYNC_MAP = [
  { src: '03_Wiki/concepts', dest: 'Wiki/Concepts', type: 'all' },
  { src: '03_Wiki/connections', dest: 'Wiki/Connections', type: 'all' },
  { src: '03_Wiki/questions', dest: 'Wiki/QA', type: 'all' },
  { src: '02_Library', dest: 'Library', type: 'md-only-recursive' }, // 递归处理图书馆，只拿 .md
  { src: '04_Output/summaries', dest: 'Output/summaries', type: 'all' },
];

function sanitizeDirectory(dir) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
    }
    fs.mkdirSync(dir, { recursive: true });
}

function copyFiles(srcPath, destPath, type) {
    if (!fs.existsSync(srcPath)) return 0;
    
    // 如果目标不是按分类的（如 Library/INDEX.md 不在子目录），确保目标目录存在
    fs.mkdirSync(destPath, { recursive: true });

    let count = 0;
    const entries = fs.readdirSync(srcPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullSrcPath = path.join(srcPath, entry.name);
        const fullDestPath = path.join(destPath, entry.name);

        if (entry.isDirectory()) {
            if (type === 'md-only-recursive') {
               count += copyFiles(fullSrcPath, fullDestPath, type);
            }
            continue; // 其他情况暂不递归
        }

        if (entry.isFile()) {
            if (entry.name.endsWith('.pdf')) continue;
            
            if (type === 'all' || (type === 'md-only-recursive' && entry.name.endsWith('.md'))) {
                 fs.copyFileSync(fullSrcPath, fullDestPath);
                 count++;
            }
        }
    }
    return count;
}

function extractRecentActivity() {
    const logPath = path.join(ROOT, '03_Wiki', '_log.md');
    if (!fs.existsSync(logPath)) return [];
    
    const content = fs.readFileSync(logPath, 'utf8');
    const entries = content.match(/^## \[.*([\s\S]*?)(?=^## \[|$)/gm) || [];
    return entries.slice(-10).reverse();
}

console.log('🏗️ 构建 Obsidian 离线 Vault...\n');

// 1. 初始化 Vault 目录（保留 .obsidian）
if (!fs.existsSync(VAULT)) fs.mkdirSync(VAULT);
for (const item of fs.readdirSync(VAULT)) {
    if (item !== '.obsidian') {
        const p = path.join(VAULT, item);
        fs.rmSync(p, { recursive: true, force: true });
    }
}

// 2. 复制内容
let totalCopied = 0;
for (const mapping of SYNC_MAP) {
    const srcPath = path.join(ROOT, mapping.src);
    const destPath = path.join(VAULT, mapping.dest);
    const count = copyFiles(srcPath, destPath, mapping.type);
    console.log(`  ✅ ${mapping.dest}: 复制 ${count} 个文件`);
    totalCopied += count;
}

// 再次特别处理 03_Wiki 根目录下的文件 和 INDEX.md
const libIndex = path.join(ROOT, '02_Library', 'INDEX.md');
if (fs.existsSync(libIndex)) {
    fs.copyFileSync(libIndex, path.join(VAULT, 'Library', 'INDEX.md'));
}

// 3. 生成 HOME.md
const homeContent = `---
title: 🏠 Vault Home
---
# WebClips 离线知识库

这是 WebClips 的离线轻量版，专为手机阅读优化（已剔除 PDF 等大文件）。

## 🗂️ 导航

- 📖 [[Wiki/Concepts]] - 汇编概念
- 📚 [[Library/INDEX]] - 原始资料清单
- 📋 [[RECENT]] - 最近活动

> [!tip] 提示
> 此 Vault 通过自动脚本构建，请不要在这里直接修改 Library 资料内容。
`;
fs.writeFileSync(path.join(VAULT, 'HOME.md'), homeContent, 'utf8');
console.log('  ✅ 生成 HOME.md');

// 4. 生成 RECENT.md
const activity = extractRecentActivity();
const recentContent = `# 📋 最近活动\n\n${activity.join('\n\n') || '> 暂无近期活动记录'}`;
fs.writeFileSync(path.join(VAULT, 'RECENT.md'), recentContent, 'utf8');
console.log('  ✅ 生成 RECENT.md');


console.log(`\n🎉 构建完成！共包含 ${totalCopied} 个精简文件。手机版同步已就绪。`);
