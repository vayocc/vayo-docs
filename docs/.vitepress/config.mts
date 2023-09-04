import { defineConfig } from 'vitepress'
import { nav } from './nav.mjs';
import { sidebar } from './sidebar.mjs';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VAYO",
  description: "VAYO",
  themeConfig: {

    logo: "/avartar/vayo_avatar_pixian.png", // 表示docs/public/avartar/vayo_avatar.jpg
    // https://vitepress.dev/reference/default-theme-config
    nav:nav,

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }  // 右上角github图标
    ]
  }
})
