import { defineConfig } from 'vitepress'
import { nav } from './conf/nav.js';
import { sidebar } from './conf/sidebar.js';

const base = '/vite-p-st/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VAYO",
  description: "VAYO的个人技术文档，略粗糙，不喜勿喷",
  //开启上次更新时间
  lastUpdated: true,
  // 网页头部信息
  base: base ,
  // 语言
  head: [
    ['link', { rel: 'icon', href: base + 'favicon.ico' }]
  ],
  lang: 'en-US',
  themeConfig: {
    logo: "/favicon.ico", // 表示docs/public/avartar/vayo_avatar.jpg
    // https://vitepress.dev/reference/default-theme-config
    nav:nav,

    sidebar: sidebar,
    outline: {
      level: [1, 6],
      label: '目录'
    },
    // 页脚
    footer: {
      message: 'Released under the <a href="https://github.com">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com">VAYO</a>'
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
    ],

    // 搜索 ST
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
    // 搜索ED


  }
})
