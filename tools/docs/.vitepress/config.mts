import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 读取同步脚本生成的侧边栏配置
function loadSidebar() {
  const sidebarPath = path.join(__dirname, 'sidebar.json')
  if (fs.existsSync(sidebarPath)) {
    return JSON.parse(fs.readFileSync(sidebarPath, 'utf-8'))
  }
  return {}
}

export default defineConfig({
  title: 'WebClips Wiki',
  description: 'LLM 编译的个人知识库 — 基于 Karpathy LLM Knowledge Base 方法论',
  lang: 'zh-CN',

  // 构建输出与基础路径
  base: '/s/webclips/',
  outDir: './.vitepress/dist',

  // 主题配置
  themeConfig: {
    logo: '🧠',
    siteTitle: 'WebClips Wiki',

    // 导航栏
    nav: [
      { text: '🧠 Wiki', link: '/wiki/' },
      { text: '📚 Library', link: '/library/' },
      { text: '📤 Output', link: '/output/' },
    ],

    // 侧边栏（从生成的 JSON 加载）
    sidebar: loadSidebar(),

    // 本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    // 社交链接（可选）
    socialLinks: [],

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 大纲层级
    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // 暗色模式
    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换暗色模式',

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
    },

    // 页脚
    footer: {
      message: '基于 Karpathy LLM Knowledge Base + BASB CODE 方法论构建',
      copyright: '由 LLM 编译和维护 · Powered by VitePress'
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',
  },

  // Markdown 配置
  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // 忽略死链（因为 Wiki 中的 [[双链]] 可能没有解析）
  ignoreDeadLinks: true,

  // Head 标签
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],
})
