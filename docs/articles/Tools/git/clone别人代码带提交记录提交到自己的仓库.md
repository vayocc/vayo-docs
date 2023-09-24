# clone别人的仓库代码如果带提交记录提交到 自己的仓库

## 1.先git clone 别人的仓库代码到本地

## 2. 修改remote远程地址

## 3. 新建分支，然后push -u到自己的仓库
根据旧分支新增一个分支

`$ git push <remote> <branch>`

> git push -u  什么意思
>

简单来说使用git push -u origin master以后就可以直接使用不带别的参数的git pull从之前push到的分支来pull。更详细的解说请参看StackOverflow：[http://stackoverflow.com/quest](https://link.zhihu.com/?target=http%3A//stackoverflow.com/questions/5697750/what-exactly-does-the-u-do-git-push-u-origin-master-vs-git-push-origin-ma)
