import { defineConfig } from 'vitepress'
import { nav } from './nav.mjs';
import { sidebar } from './sidebar.mjs';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VAYO",
  description: "VAYO",
  //开启上次更新时间
  lastUpdated: true,
  // 网页头部信息
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // 语言
  lang: 'en-US',
  base: '/vite-p-st/' ,
  themeConfig: {


    logo: "/avartar/vayo_avatar_pixian.png", // 表示docs/public/avartar/vayo_avatar.jpg
    // https://vitepress.dev/reference/default-theme-config
    nav:nav,

    sidebar: sidebar,
    outline: {
      level: [2, 6],
      label: '目录'
    },
    // 页脚
    footer: {
      copyright: "Copyright © 2022-present VAYO",
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }  // 右上角github图标
    ]
  }
})
