const fs = require('fs') // 文件模块
const path = require('path') // 路径模块
const one  = 'javaUtil'; // examples 最下级的文件夹名
const rootPath  = path.join('articles','java'); // articles
const oneself  = path.join(rootPath ,one);



// __dirname 用于获取当前模块的所在目录的绝对路径 path.dirname(__dirname) 将返回 __dirname 的父目录的路径
// path.resolve(__dirname,'..') 要获取当前模块所在的上级目录的绝对路径

const docsRoot = path.join( path.resolve(__dirname,'..'), oneself)
const log = console.log

function readFile(dir = docsRoot, sidebarItemList = [], fpath = '') {
    let files = fs.readdirSync(dir)
    // 1 10 排序错误

    console.log('------');
    console.log(files);
    files.forEach((item, index) => {
        let filePath = path.join(dir, item)
        const stat = fs.statSync(filePath)
        // log('isDirectory-------------------', stat.isDirectory(), item)
        // isDirectory 返回是否文件夹, 4.file.md dir:/Users/xx/reg-rules-js-site/docs/regular
        const fileNameArr = path.basename(filePath).split('.')
        if (stat.isDirectory()) {
            // 如果是目录的话先不让他走了
            return
            // 生成目录名
            let title = fileNameArr.length > 1 ? fileNameArr[1] : fileNameArr[0]
            if(!title){
                log(`warning: 该文件夹 "${filePath}" 没有按照约定命名，将忽略生成相应数据。`)
                return
            }
            sidebarItemList.push({
                title,
                collapsable: false,
                children: [],
            })
            // log('递归读取文件夹的文件', path.join(dir, item), filesList[index].children, item)
            // 递归读取文件夹的文件 /Users/another/Documents/self-study/reg-rules-js-site/docs/test/test2 [] test2
            readFile(path.join(dir, item), sidebarItemList[index].children, item)
        } else if (path.extname(item) === '.md' && item !== 'index.md') {
            const fileName = path.basename(filePath, '.md');
            const filePathWithoutExt = path.join(fpath, fileName);
            const link =  path.join (rootPath,filePathWithoutExt).replace(/\\/g, '/');
            console.log('fileName',fileName ,filePathWithoutExt);
            const sidebarItem = {
                text: fileName,
                link: `/${link}`,
            };
            sidebarItemList.push(sidebarItem);
        }
    })
    return sidebarItemList
}
const sidebarItems  = readFile(docsRoot,[],one)


function writeSidebarConfig(){
    const sidebarConfig = {};
    // 设置键值对
    const keyName = oneself.replace(/\\/g, '/');
    sidebarConfig[`/${keyName}/`] = [
        {
            text: one,
            items:  sidebarItems,
        },
    ];
    return sidebarConfig;
}
// console.log(JSON.stringify(list))
// JSON.stringify() 方法的第一个参数是要格式化的数据，
// 第二个参数为 null，表示不进行任何替换操作，
// 第三个参数为 2，表示使用两个空格缩进。
// 通过将数据对象 data 进行格式化，你将获得更易读的输出结果
console.log(JSON.stringify(sidebarItems, null, 2));
console.log('----------');
console.log(JSON.stringify(writeSidebarConfig(), null, 2));