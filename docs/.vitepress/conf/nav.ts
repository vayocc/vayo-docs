import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    // examples { text: 'Home', link: '/' },{ text: 'Examples', link: '/markdown-examples' },
    {
        text: 'HOME',
        link: '/' // 表示docs/index.md
    },
    {
        text: 'Java',
        items: [
            {
                text: 'Java',
                link: '/articles/Java/Syntax/Stream流'
            }

        ]
    },
    {
        text: 'Spring',
        items: [
            {
                text: 'SpringFramework',
                link: '/articles/Spring/SpringFramework/ResponseBodyAdvice'
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
