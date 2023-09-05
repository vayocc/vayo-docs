import { DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
    // examples { text: 'Home', link: '/' },{ text: 'Examples', link: '/markdown-examples' },
    {
        text: 'Home',
        link: '/' // 表示docs/index.md
    },
    {
        text: 'examples',
        link : '/examples/'
    },
    {
        text: '个人成长',
        items: [
            {
                text: '大江南北游记',
                link: '/column/Travel/' // 表示docs/column/Travel/index.md
            },
            {
                text: '所思·所想',
                link: '/column/Growing/' // 表示docs/column/Growing/index.md
            }
        ]
    },
    {
        text: '前端开发',
        items: [
            {
                text: '数据结构与算法',
                link: '/column/Algorithm/' // 对应docs/column/Algorithm下的index.md文件
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
    }
];
