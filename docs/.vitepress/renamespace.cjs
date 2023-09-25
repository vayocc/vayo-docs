/*
把文件夹下面.png/.jpg结尾的空格替换为_下划线
执行命令
node rename.js <文件路径>
*/

const fs = require('fs');
const path = require('path');
// 通过命令行参数获取当前目录
const currentDirectory = process.argv[2] ;


// 获取当前目录下所有文件名包含空格的文件
const filesWithSpaces = fs.readdirSync(currentDirectory).filter(file => file.includes(' '));

// 重命名文件名中的空格为下划线
filesWithSpaces.forEach(file => {
    const oldPath = path.join(currentDirectory, file);
    const newPath = path.join(currentDirectory, file.replace(/ /g, '_'));
    fs.renameSync(oldPath, newPath);
});

// 获取当前目录下所有扩展名为 .png 的文件
const pngFiles = fs.readdirSync(currentDirectory).filter(file => path.extname(file) === '.png');
// 获取当前目录下所有扩展名为 .png 或 .jpg 的文件
const imageFiles = fs.readdirSync(currentDirectory).filter(file => ['.png', '.jpg'].includes(path.extname(file)));

// 去除文件名中的空格
imageFiles.forEach(file => {
    const oldPath = path.join(currentDirectory, file);
    const newPath = path.join(currentDirectory, file.replace(/ /g, ''));
    fs.renameSync(oldPath, newPath);
});
