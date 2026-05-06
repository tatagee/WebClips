---
title: "一文理清！Hermes 全部高阶工具配置"
source: "https://x.com/ResearchWang/article/2045812932538438001"
clipped_at: "2026-04-21"
category: "[AI_IDE_And_CLI]"
tags: ["hermes-agent", "cli-tools", "ai-configuration"]
status: raw
compiled: false
---
![Image](https://pbs.twimg.com/media/HGOjGdMb0AAq53S?format=jpg&name=large)

hermes出来后发现并没有的太多人迁移过来，这次不像之前 openclaw 小龙虾发布的时候，大家都在等 ，等更好的 Agent ，等更好的模型。实际操作起来后面即使出现更好的Agent也是一通百通的其实。

为了治好大家的拖延症，我把我实测的 Hermes 配置清单整理出来了。这套配置横跨多个领域，直接从底层逻辑到实战部署，告诉你每一个组件到底能帮你干什么。

![Image](https://pbs.twimg.com/media/HGQe3_EbMAAjWcG?format=jpg&name=large)

[https://researchwang13.space/hermes/](https://researchwang13.space/hermes/)

**推荐阅读：**[我的 OpenClaw 到 Hermes 无痛迁移实录](https://x.com/ResearchWang/status/2045133243629154726)

# 📚 目录

- **身份与记忆** — SOUL.md / 角色库 / 记忆后端
- **感知能力** — 内容抓取 / 网页搜索 / 浏览器自动化 / 文档处理
- **表达能力** — 语音 / 图片生成
- **效率与成本** — Token 监控 / 自我进化 / Skill 库
- **生态导航** — Hermes 资源入口

## 一. 身份与记忆

**1\. 装完 Hermes 第一件事不是用它，是告诉它"你是谁"**

> **SOUL.md** 是 Hermes 的人格文件，系统提示的第一个位置。但大多数人不知道怎么写？

我的做法是先从网上摘取一个模板，在慢慢和hermes对话，每次对话完都会提醒hermes 对 soul.md 的文件进行修改，迭代。我用的是 agency-agents-zh。 它里面有 211 个中文角色模板，覆盖小红书运营、技术写作、研究助手等场景。

> [agency-agents-zh: 211 个即插即用的 AI 专家角色 — 支持 Hermes Agent](https://github.com/jnMetaCode/agency-agents-zh)

211个一个一个浏览太多了，可以用github的搜索，查找你要的领域，岗位名称，所在平台。然后再 hermer中说 ：“ **激活 xxxx 模式 ”**

```bash
# 安装命令

https://github.com/jnMetaCode/agency-agents-zh 安装这个存储库

# 激活模式（以小红书写作模式为例子）

激活小红书内容写作模式
```

![Image](https://pbs.twimg.com/media/HGP7ZYsa8AAGdRu?format=jpg&name=large)

**2\. 记忆层面，虽然Hermes的记忆系统相比与Openclaw做了不少提高，但Hermes 内置的 MEMORY.md 只也记"模型主动写下来的东西"。**

> 换成 Hindsight 之后，它会自动从每次对话中提取实体和关系

> 你周一提了一个项目截止日期，周五新会话里它自动记得，不需要重复

```bash
# 安装命令
https://github.com/vectorize-io/hindsight 帮我再服务器上部署hindsight，并且当作 hermes 的记忆系统

# 可以把自己的第三方api导入，或者用openai
# 我用到是deepseek的 api
```

![Image](https://pbs.twimg.com/media/HGQJt0MaAAAG2vo?format=png&name=large)

**总结：**

- SOUL.md → agency-agents-zh（211+ 中文角色模板）
- 记忆 → Hindsight（可以自建到服务器上）

## 二. 感知能力

**agent 不能只和你聊天，它要能读懂互联网、吃掉文档、操作网页**

- **内容抓取**我用两个工具组合：

> **Jina Reader ：** 抓单页 —— URL 前面加 [r.jina.ai/](https://r.jina.ai/) 就出干净 Markdown

> **Crawl4AI：** 深度抓取 —— 开源、本地运行、基于 Playwright，支持用本地模型做结构化提取，完全免费。

```bash
# 安装命令
配置 https://github.com/jina-ai/reader 和 https://github.com/unclecode/crawl4ai
```

- **绕反爬**（Cloudflare ，验证码 ...）- 使用**反爬代理**和**隐身浏览器**

> Hermes 自带 **Scrapling** **optional-skill，不需要再额外装了**

- **隐身浏览器推荐 CamoFox 和 Browser Use**

> 目前hermes已经内置好了 Browser Use ，我们只需要安装 CamoFox 就好

```bash
# 安装camofox
帮我安装 camofox ，链接为：https://github.com/jo-inc/camofox-browser
```

![Image](https://pbs.twimg.com/media/HGQZrmebIAAOgSi?format=png&name=large)

- **网页搜索**用 **Tavily**

> 每月 1000 次免费，专为 AI agent 设计，返回带引用的结构化结果

> 再配置DuckDuckGo 做零成本兜底

```bash
# 安装Tavily
# 1. 去 tavily.com 注册，拿 API key（免费 1000 次/月）
https://app.tavily.com/sign-in

# 2. 写入 Hermes 环境变量
echo 'TAVILY_API_KEY=tvly-你的key' >> ~/.hermes/.env

# 3. 设置搜索后端
hermes config set web.backend tavily

# 在终端输入  ， duckduckgo是hermes内置的浏览器搜索引擎
hermes config set web.backend duckduckgo
```

![Image](https://pbs.twimg.com/media/HGQcebDaQAAop3I?format=png&name=large)

- **文档处理**

> **格式转化用 Pandoc：** 可将 PDF、DOCX、HTML、EPUB、LaTeX、CSV、reStructuredText、MediaWiki、OPML 转成 Markdown、HTML、DOCX、PDF、EPUB、LaTeX、纯文本...

> PDF 转 Markdown 效果差的话换 **Marker**

```bash
# 安装pandoc
帮我安装pandoc https://pandoc.org/installing.html#linux

# 
帮我安装maker，链接为：https://github.com/datalab-to/marker
 PDF 转 Markdown时使用 maker
```

**推荐配置：**

- 单页抓取 → Jina Reader（[r.jina.ai](https://r.jina.ai/)）
- 批量抓取 → Crawl4AI
- 反爬 → Scrapling（Hermes optional-skill）
- 搜索 → Tavily（1000 次免费/月）+ DuckDuckGo 兜底
- 浏览器 → Camofox（需要时才用）
- 文档 → Pandoc + Marker

## 三. 表达能力

agent 不只要能"看"，还要能"说"和"画"

- **语音识别**

> Telegram 场景的刚需。识别用 **Whisper** 本地模式，99 种语言，Telegram 语音消息自动转文字

> 合成用 **Edge TTS**，微软免费，质量不差，Hermes 默认方案。两个加一起零成本

```bash
# 安装  whisper
 帮我安装 whisper： https://github.com/openai/whisper
```

- **图片生成**

> 用 [Fal.ai](https://fal.ai/) **, Midjourney , DALL-E 3**

```bash
# Black Forest Labs 官方 FLUX Skill 
hermes skills install black-forest-labs/skills

# 导入FAL.ai的api-key

# 配置 FAL.ai , 去 fal.ai 注册拿 key，有免费额度
echo 'FAL_KEY=你的key' >> ~/.hermes/.env
```

![Image](https://pbs.twimg.com/media/HGQpUoAbkAAPKUe?format=png&name=large)

## 四. 效率与成本

- **如果你需要知道 token 花在哪里？**

> **Token 监控**用 **tokscale**。一条命令 tokscale --hermes 看全局消耗

> 深度分析用 **hermes-dashboard**，社区成员做的 token 面板，能按组件**拆解：系统提示占多少、工具定义占多少、消息历史**占

```bash
# tokscale
# tokscale --hermes 看全局消耗
链接： https://github.com/junhoyeo/tokscale

# hermes-dashboard
链接： https://github.com/Bichev/hermes-dashboard
```

- **想减小 token 开销的话**

> **RTK（Rust Token Killer）** : 能把终端命令的 token 消耗压掉 80-90%

```bash
# RTK (Rust Token Killer)

https://github.com/adityahimaone/hermes-agent
```

- **自我进化**

> 等系统稳定两周后再开。**hermes-agent-self-evolution** 用遗传算法自动优化 Hermes 的 prompt 和行为，但建议搭配一个验证 cron——防止优化循环把你还没调好的配置"优化"得更乱。

- **Skill 扩展**

> 一次性装 **wondelai/skills**（380+ 跨平台 skill）扩展基础能力

> 再按需从 [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)**（**1000+ skills）里挑

```bash
# skills 安装
帮我安装这个 链接为：https://github.com/wondelai/skills
```

## 五. 生态导航 — Hermes 资源汇总

收藏一个入口就够了：**awesome-hermes-agent**所有工具、skill、插件、教程都在这里

配套：

- **Hermes 生态地图** → [hermes-ecosystem.vercel.app](https://hermes-ecosystem.vercel.app/)（80+ 工具可视化）
- **Hermes 官方文档** → [hermes-agent.nousresearch.com/docs](https://hermes-agent.nousresearch.com/docs)
- 🤩**🤩****awesome-hermes-agent →** [https://github.com/0xNyk/awesome-hermes-agent](https://github.com/0xNyk/awesome-hermes-agent)
- Research王13-hermes专栏： [https://researchwang13.space/hermes](https://researchwang13.space/hermes/)