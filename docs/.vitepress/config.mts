import { defineConfig } from 'vitepress'
import { nav } from './nav.mjs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VAYO",
  description: "VAYO",
  themeConfig: {

    logo: "/avartar/vayo_avatar.jpg", // 表示docs/public/avartar/vayo_avatar.jpg
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }  // 右上角github图标
    ]
  }
})
