# 忽略错误
set -e

# 打包（构建）
npm run build

# 进入待发布目录
cd docs/.vitepress/dist

# 将代码提交到gitee上，进行托管
git init
git add -A
git commit -m '部署'

# 部署到远程
git push -f [remoteURL] master:gh-pages

cd -
