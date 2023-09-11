import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    // examples { text: 'Home', link: '/' },{ text: 'Examples', link: '/markdown-examples' },
    {
        text: 'Home',
        link: '/' // 表示docs/index.md
    },
    {
        text: 'java',
        items: [
            {
                text: 'java',
                link: '/articles/java/Syntax/Stream流'
            }

        ]
    },
    {
        text: '关于我',
        items: [
            { text: 'Github', link: '-' },
            {
                text: '掘金',
                link: '-'
            },
            {
                text: '飞书社区',
                link: '-'
            }
        ]
    },
    {
        text: 'examples',
        link : '/articles/examples/'
    },
];
