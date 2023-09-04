// docs/.vitepress/relaConf/index.ts 配置内容较多，单独起个文件

// docs/.vitepress/relaConf/navbar.ts
import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {


    '/examples/':[
        {
            text: 'Examples',
            items: [
                { text: 'Markdown Examples', link: '/examples/markdown-examples' },
                { text: 'Runtime API Examples', link: '/examples/api-examples' }
            ]
        }
    ],
    // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
    '/column/Algorithm/': [
        // 第一部分
        {
            text: '栈和队列',
            items: [
                {
                    text: '栈-深拷贝和浅拷贝',
                    link: '/column/Algorithm/001_Stack'
                },
                {
                    text: '队列-事件循环',
                    link: '/column/Algorithm/002_Queue'
                }
            ]
        },
        // 第二部分
        {
            text: '字典和树',
            items: [
                {
                    text: '字典和集合-Set和Map',
                    link: '/column/Algorithm/003_Dictionary'
                },
                {
                    text: '树-深/广度优先遍历',
                    link: '/column/Algorithm/004_Tree'
                }
            ]
        }
    ]
};


