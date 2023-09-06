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
    logo: "/favicon.ico", // 表示docs/public/avartar/vayo_avatar.jpg
    // https://vitepress.dev/reference/default-theme-config
    nav:nav,

    sidebar: sidebar,
    outline: {
      level: [2, 6],
      label: '目录'
    },
    // 页脚
    footer: {
      // message: 'Released under the MIT License.',
      copyright: "Copyright © 2022-present VAYO",
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // 编辑连接
    /*editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },*/
    // 社交连接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }  // 右上角github图标
    ]
  }
})
