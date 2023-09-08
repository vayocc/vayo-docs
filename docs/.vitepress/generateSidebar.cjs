const fs = require('fs');
const path = require('path');
const  rootPath  = '/articles/examples/';
function generateSidebarConfig(rootDir, sidebarConfig, baseDir = '') {
    const files = fs.readdirSync(rootDir);

    const sidebarItems = [];

    files.forEach((file) => {
        const filePath = path.join(rootDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subdirConfig = {};
            const subdirBaseDir = path.join(baseDir, file);
            generateSidebarConfig(filePath, subdirConfig, subdirBaseDir);

            if (Object.keys(subdirConfig).length > 0) {
                const sidebarItem = {
                    text: path.basename(filePath),
                    link: `${subdirBaseDir}/`,
                    items: Object.values(subdirConfig),
                };
                sidebarItems.push(sidebarItem);
            }
        } else if (path.extname(file) === '.md' && file !== 'index.md') {
            const fileName = path.basename(file, '.md');
            const filePathWithoutExt = path.join(baseDir, fileName);
            const sidebarItem = {
                text: fileName,
                link: `${rootPath}${filePathWithoutExt}`,
            };
            sidebarItems.push(sidebarItem);
        }
    });


    if (sidebarItems.length > 0) {
        sidebarConfig[rootPath] = [
            {
                text: 'Examples',
                items:  sidebarItems,
            },
        ];
    }
}

const rootDir = path.join(__dirname, '..'+rootPath);
const sidebarConfig = {};

generateSidebarConfig(rootDir, sidebarConfig);

console.log(JSON.stringify(sidebarConfig, null, 2));
