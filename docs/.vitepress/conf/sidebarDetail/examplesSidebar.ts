/**
 * 数构与前端专栏：侧导详情
 */
export const examplesSidebar = {
    '/articles/examples/':[
        {
            text: 'Examples',
            items: [
                { text: 'Markdown Examples', link: '/articles/examples/markdown-examples' },
                { text: 'Runtime API Examples', link: '/articles/examples/api-examples' }
            ]
        },
        {
            text: 'Section Title A',
            collapsed: true, // 默认折叠
            items: [
                { text: 'Markdown Examples', link: '/articles/examples/markdown-examples' },
                { text: 'Runtime API Examples', link: '/articles/examples/api-examples' },
                {
                    text: 'Level 3',
                    items: [
                        { text: 'Markdown Examples', link: '/articles/examples/markdown-examples' },
                        { text: 'Runtime API Examples', link: '/articles/examples/api-examples' },
                    ]
                }
            ]
        }
    ],
};
