
import { DefaultTheme } from 'vitepress';
import {examplesSidebar, javaSidebar, springSidebar, toolsSidebar} from "./sidebarDetail";
import {ormSidebar} from "./sidebarDetail/orm";


export const sidebar: DefaultTheme.Sidebar = {


    ...examplesSidebar,
    ...javaSidebar,
    ...springSidebar,
    ...toolsSidebar,
    ...ormSidebar,
    // /articles/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
    '/articles/Algorithm/': [
        // 第一部分
        {
            text: '栈和队列',
            items: [
                {
                    text: '栈-深拷贝和浅拷贝',
                    link: '/articles/Algorithm/001_Stack'
                },
                {
                    text: '队列-事件循环',
                    link: '/articles/Algorithm/002_Queue'
                }
            ]
        },
        // 第二部分
        {
            text: '字典和树',
            items: [
                {
                    text: '字典和集合-Set和Map',
                    link: '/articles/Algorithm/003_Dictionary'
                },
                {
                    text: '树-深/广度优先遍历',
                    link: '/articles/Algorithm/004_Tree'
                }
            ]
        }
    ]
};


