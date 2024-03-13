import { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    // examples { text: 'Home', link: '/' },{ text: 'Examples', link: '/markdown-examples' },
    {
        text: 'HOME',
        link: '/' // 表示docs/SpringBoot-Actuator.md
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
                text: 'SpringBoot',
                link: '/articles/Spring/SpringBoot/SpringBoot-Actuator'
            },
            {
                text: 'SpringFramework',
                link: '/articles/Spring/SpringFramework/ResponseBodyAdvice'
            }

        ]
    },
    {
        text: '数据库',
        items: [
            {
                text: 'Sql数据库',
                items:[
                    {
                        text: 'mysql',
                        link: '/articles/sql/mysql/explain'
                    },
                ]
            },
            {
                text: 'NoSql数据库',
                items:[
                    {
                        text: 'Redis',
                        link: '/articles/sql/nosql/redis/Redis6学习笔记-尚硅谷'
                    }
                ]
            },


        ]
    },
    {
        text: '开发',
        items: [
            {
                text: '正则',
                link: '/articles/develop/regex/收集的regex'
            },
        ]
    },
    {
        text: '框架|中间件',
        items: [
            {
                text: 'ORM框架',
                items:[
                    {
                        text: 'MyBatis/Plus',
                        link: '/articles/orm/mybatisplus/全表限制更新删除'
                    }
                ]
            },


        ]
    },
    {
        text: '工具',
        items: [

            {
                text: '构建工具',
                link: '/articles/Tools/mvnrepository/gradle/Gradle及IDEA设置'
            },
            {
                text: '版本工具',
                link: '/articles/Tools/git/git命令'
            },
            {
                text: '开发工具',
                link: '/articles/Tools/IDEA/IntelliJIDEA快捷键大全动图演示'
            },
            {
                text: '其他工具',
                link: '/articles/Tools/other/模拟手写'
            },

        ]
    },
    {
        text: '关于我',
        items: [
            { text: 'Notion', link: 'https://vayocc.notion.site/VAYO-openDev-d6dab56f3f214702849e103c6ab50d68?pvs=4' },
            {
                text: '掘金',
                link: 'https://juejin.cn/user/409441865308216/posts'
            },

        ]
    },
    {
        text: 'examples',
        link : '/articles/examples/'
    },
];
