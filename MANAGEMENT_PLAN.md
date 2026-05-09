# WebClips 项目管理方案

> 本文档规划如何将 WebClips 项目分割为两部分进行管理：01_Inbox 保留在 Google Drive 上，02-05 目录及配置文件通过 GitHub repo 进行版本控制。

---

## 1. 设计目标

1. **保留 01_Inbox 在 Google Drive 上**：便于随时放入新文章，无需手动操作 Git
2. **02-05 目录全面转移到 GitHub repo**：实现版本控制、团队协作和历史追踪
3. **保持工作流完整**：确保现有的 organize-webclips、compile-wiki 等工作流能够正常工作
4. **简化部署**：支持 VitePress 静态网站的构建和部署

---

## 2. 项目结构规划

### 2.1 当前结构（全部在 Google Drive）
```
WebClips/
├── 01_Inbox/          # 临时存放区
├── 02_Library/        # 原始文章库
├── 03_Wiki/           # LLM 编译的知识 Wiki
├── 04_Output/         # 生成的输出产物
├── 05_Vault/          # Obsidian Vault
├── .agents/           # 工作流定义
├── .tools/            # 辅助工具
├── config/            # 配置文件
├── docs/              # VitePress 文档
└── ... 其他配置文件
```

### 2.2 新结构（分割后）
```
Google Drive (本地同步)          GitHub Repo
┌─────────────────────┐      ┌─────────────────────────┐
│ WebClips/           │      │ WebClips-Repo/          │
│ ├── 01_Inbox/       │ ───→ │ ├── 02_Library/         │
│ │   └── *.md        │      │ ├── 03_Wiki/            │
│ └── (其他文件)       │      │ ├── 04_Output/          │
│                     │      │ ├── 05_Vault/           │
│                     │      │ ├── .agents/            │
│                     │      │ ├── .tools/             │
│                     │      │ ├── config/             │
│                     │      │ ├── docs/               │
│                     │      │ └── 其他配置文件         │
└─────────────────────┘      └─────────────────────────┘
```

---

## 3. Git 版本控制策略

### 3.1 .gitignore 配置
在 GitHub repo 根目录创建 `.gitignore` 文件，排除不需要版本控制的内容：

```gitignore
# 01_Inbox 目录 - 保留在 Google Drive 上
01_Inbox/

# 依赖和构建产物
node_modules/
dist/
.cache/

# VitePress 生成内容（由 sync-docs.mjs 动态生成）
docs/wiki/
docs/library/
docs/output/
docs/index.md
docs/.vitepress/sidebar.json
docs/.vitepress/dist/
docs/.vitepress/cache/

# 离线手机版 Vault (动态生成)
05_Vault/*
!05_Vault/.obsidian/

# 操作系统文件
.DS_Store
Thumbs.db

# 日志和临时文件
*.log
*.tmp
```

### 3.2 Git 远程仓库设置
建议创建一个新的 GitHub repo（例如 `WebClips-Repo`），或者重用现有的 repo：
- 如果重用现有 repo，需要从历史中移除 01_Inbox 目录（使用 `git filter-branch` 或 `git filter-repo`）
- 如果创建新 repo，可以直接将 02-05 目录推送到新仓库

### 3.3 分支策略
建议使用简单的分支策略：
- `main` 分支：主要开发分支
- 可选的 `gh-pages` 分支：用于 VitePress 静态网站部署

---

## 4. 同步机制设计

### 4.1 手动同步流程
用户将新文章放入 Google Drive 的 01_Inbox 目录后，需要手动触发同步：

```bash
# 1. 进入 GitHub repo 目录
cd /path/to/WebClips-Repo

# 2. 从 Google Drive 复制新文章到临时目录
mkdir -p 01_Inbox_temp
cp /path/to/Google\ Drive/WebClips/01_Inbox/*.md 01_Inbox_temp/

# 3. 运行整理工作流
# 在 AI 助手中运行 /organize-webclips
# 工作流将处理 01_Inbox_temp 中的文章
```

### 4.2 自动同步脚本（可选）
创建一个同步脚本 `sync-inbox.sh`，自动从 Google Drive 复制新文章：

```bash
#!/bin/bash
# sync-inbox.sh - 从 Google Drive 同步 01_Inbox 内容

SOURCE_DIR="$HOME/Google Drive/WebClips/01_Inbox"
TEMP_DIR="./01_Inbox_temp"

# 创建临时目录
mkdir -p "$TEMP_DIR"

# 复制新文件（排除已处理的文件）
rsync -av --exclude='*.processed' "$SOURCE_DIR/" "$TEMP_DIR/"

# 检查是否有新文件
if [ "$(ls -A $TEMP_DIR 2>/dev/null)" ]; then
    echo "发现新文章，请运行 /organize-webclips 工作流"
else
    echo "没有新文章"
fi
```

### 4.3 工作流调整
需要修改现有的工作流，使其支持新的目录结构：

1. **修改 organize-webclips 工作流**：
   - 添加对 `01_Inbox_temp` 目录的支持
   - 如果 `01_Inbox_temp` 不存在，则尝试读取 `01_Inbox`（兼容旧结构）

2. **修改 compile-wiki 和 query-wiki 工作流**：
   - 这些工作流只操作 `02-05` 目录，不需要修改

---

## 5. 部署考虑

### 5.1 VitePress 静态网站部署
由于 VitePress 需要访问 `02_Library`、`03_Wiki`、`04_Output` 目录来生成静态网站，而这些目录都在 GitHub repo 中，因此部署不受影响。

部署流程：
1. 在 GitHub repo 中运行 `npm run docs:build`
2. 构建产物在 `docs/.vitepress/dist/` 目录
3. 可以部署到 GitHub Pages 或其他静态托管服务

### 5.2 GitHub Actions 自动部署（可选）
可以设置 GitHub Actions，在每次推送到 `main` 分支时自动构建和部署静态网站。

---

## 6. 迁移步骤

### 6.1 准备工作
1. 备份当前 Google Drive 上的 WebClips 目录
2. 创建新的 GitHub repo（或决定重用现有 repo）
3. 安装必要的工具（Git、Node.js 等）

### 6.2 迁移步骤

#### 方案 A：创建新 GitHub Repo
```bash
# 1. 创建新目录作为 repo
mkdir WebClips-Repo
cd WebClips-Repo

# 2. 初始化 Git
git init

# 3. 复制 02-05 目录及配置文件
cp -r /path/to/Google\ Drive/WebClips/02_Library .
cp -r /path/to/Google\ Drive/WebClips/03_Wiki .
cp -r /path/to/Google\ Drive/WebClips/04_Output .
cp -r /path/to/Google\ Drive/WebClips/05_Vault .
cp -r /path/to/Google\ Drive/WebClips/.agents .
cp -r /path/to/Google\ Drive/WebClips/.tools .
cp -r /path/to/Google\ Drive/WebClips/config .
cp -r /path/to/Google\ Drive/WebClips/docs .
cp /path/to/Google\ Drive/WebClips/.gitignore .
cp /path/to/Google\ Drive/WebClips/package.json .
cp /path/to/Google\ Drive/WebClips/package-lock.json .
cp /path/to/Google\ Drive/WebClips/ARCHITECTURE.md .
cp /path/to/Google\ Drive/WebClips/start.sh .
cp /path/to/Google\ Drive/WebClips/convertMD2PDF.sh .

# 4. 添加 .gitignore 内容（确保排除 01_Inbox）
echo -e "\n# 01_Inbox 目录 - 保留在 Google Drive 上\n01_Inbox/" >> .gitignore

# 5. 提交并推送
git add .
git commit -m "Initial commit: WebClips repo structure"
git remote add origin https://github.com/your-username/WebClips-Repo.git
git push -u origin main
```

#### 方案 B：重用现有 GitHub Repo
```bash
# 1. 进入现有 repo 目录
cd /path/to/WebClips

# 2. 从 Git 历史中移除 01_Inbox 目录（可选）
# 注意：这会重写历史，需要强制推送
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch 01_Inbox/' \
  --prune-empty --tag-name-filter cat -- --all

# 3. 添加 .gitignore 排除 01_Inbox
echo -e "\n# 01_Inbox 目录 - 保留在 Google Drive 上\n01_Inbox/" >> .gitignore

# 4. 提交并推送
git add .
git commit -m "Remove 01_Inbox from version control"
git push origin main --force
```

### 6.3 验证步骤
1. 检查 GitHub repo 中是否包含 02-05 目录及所有配置文件
2. 检查 01_Inbox 目录是否被正确排除
3. 测试工作流是否正常工作
4. 测试 VitePress 构建是否正常

---

## 7. 工作流程调整

### 7.1 新的日常工作流
```
1. 在 Google Drive 的 01_Inbox 目录中放入新文章
2. 运行同步脚本（或手动复制）将文章复制到 repo 的 01_Inbox_temp 目录
3. 在 AI 助手中运行 /organize-webclips 工作流
4. 工作流处理文章并移动到 02_Library
5. 运行 /compile-wiki 提取概念
6. 运行 VitePress 构建：npm run docs:build
7. 推送到 GitHub：git push
```

### 7.2 备份策略
- **Google Drive**：自动备份 01_Inbox 目录
- **GitHub**：版本控制 02-05 目录及所有配置文件
- **本地备份**：定期备份整个项目（包括两个部分）

---

## 8. 优势与挑战

### 8.1 优势
1. **灵活性**：01_Inbox 保留在 Google Drive 上，方便随时放入新文章
2. **版本控制**：02-05 目录通过 Git 进行版本控制，支持历史追踪和团队协作
3. **工作流兼容**：现有工作流只需少量修改即可适应新结构
4. **部署简单**：VitePress 构建不受影响，可以正常部署静态网站

### 8.2 挑战
1. **同步复杂性**：需要手动或自动同步 01_Inbox 内容
2. **目录结构变化**：需要调整工作流以支持新的目录结构
3. **备份分散**：需要分别管理 Google Drive 和 GitHub 的备份

---

## 9. 替代方案

### 9.1 方案二：完全分离
将 01_Inbox 完全独立为一个单独的 Google Drive 文件夹，与 WebClips repo 完全分离。
- **优点**：结构更清晰
- **缺点**：需要更多的手动操作

### 9.2 方案三：符号链接
在 GitHub repo 中使用符号链接指向 Google Drive 上的 01_Inbox 目录。
- **优点**：工作流无需修改
- **缺点**：Git 不跟踪符号链接的目标，部署时可能有问题

### 9.3 方案四：Git LFS 大文件存储
如果 01_Inbox 中有大文件，可以使用 Git LFS 进行管理。
- **优点**：所有内容都在 Git 中
- **缺点**：增加复杂性，不适合频繁变更的内容

---

## 10. 推荐方案

### 推荐方案：方案 B（重用现有 Repo）+ 简化实施

**理由**：
1. **最简单**：不需要创建新的 GitHub repo
2. **零风险**：不需要重写 Git 历史
3. **立即生效**：只需更新 .gitignore 文件
4. **完全兼容**：现有工作流无需任何修改

**核心思路**：
- 保持当前目录结构不变
- 将 01_Inbox 目录添加到 .gitignore 中
- 01_Inbox 继续保留在 Google Drive 上
- 02-05 目录继续在 Git 版本控制中

### 为什么选择这个方案？

1. **最小改动**：只需要修改一个 .gitignore 文件
2. **无需迁移**：所有内容保持原位
3. **工作流完全兼容**：organize-webclips 等工作流无需任何修改
4. **部署不受影响**：VitePress 构建正常

### 实施步骤（5分钟）

```bash
# 1. 在 .gitignore 文件末尾添加 01_Inbox/
echo -e "\n# 01_Inbox 目录 - 保留在 Google Drive 上\n01_Inbox/" >> .gitignore

# 2. 提交更改
git add .gitignore
git commit -m "Exclude 01_Inbox from version control"
git push
```

就这么简单！

---

## 11. 实施计划

### 第一阶段：准备（5分钟）
1. 备份当前 .gitignore 文件（可选）
2. 编辑 .gitignore 文件

### 第二阶段：更新配置（5分钟）
1. 在 .gitignore 文件末尾添加 01_Inbox/ 目录
2. 确保其他配置正确

### 第三阶段：提交更改（5分钟）
1. 提交 .gitignore 更改
2. 推送到 GitHub

### 第四阶段：验证（5分钟）
1. 检查 Git 是否忽略 01_Inbox 目录
2. 测试工作流是否正常工作
3. 测试 VitePress 构建

**总耗时：约20分钟**

---

## 12. 总结

### 最终方案

通过简单的配置调整：
- **Google Drive**：继续保留 01_Inbox 目录，便于随时放入新文章
- **GitHub repo**：继续管理 02-05 目录及配置文件，实现版本控制
- **.gitignore**：排除 01_Inbox 目录，使其不被 Git 跟踪

### 优势

1. **零成本实施**：只需修改一个 .gitignore 文件
2. **完全兼容**：现有工作流无需任何修改
3. **无缝集成**：Google Drive 和 Git 协同工作
4. **最小风险**：不改变任何现有结构

### 结果

用户可以继续：
1. 随时将新文章放入 Google Drive 的 01_Inbox 目录
2. 使用现有的工作流处理文章
3. 通过 Git 进行版本控制
4. 部署 VitePress 静态网站

**这就是最简单、最安全的解决方案！**