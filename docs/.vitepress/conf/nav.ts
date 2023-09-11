import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    // examples { text: 'Home', link: '/' },{ text: 'Examples', link: '/markdown-examples' },
    {
        text: 'Home',
        link: '/' // 表示docs/index.md
    },
    {
        text: 'examples',
        link : '/articles/examples/'
    },
    {
        text: 'JAVA',
        items: [
            {
                text: 'javaUtil',
                link: '/articles/java/javaUtil/'
            }
        ]
    },
    {
        text: '个人成长',
        items: [
            {
                text: '大江南北游记',
                link: '/q' // 表示docs/articles/Travel/index.md
            },
            {
                text: '所思·所想',
                link: '/articles/Growing/' // 表示docs/articles/Growing/index.md
            }
        ]
    },
    {
        text: '前端开发',
        items: [
            {
                text: '数据结构与算法',
                link: '/articles/Algorithm/' // 对应docs/articles/Algorithm下的index.md文件
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
