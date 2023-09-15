


## 一.安装 Gradle

### 1.下载 Gradle 安装包

官网下载链接：https://gradle.org/releases/


![img](Gradle及IDEA设置\e9082f66ee7347728b8af363cf925685.png)

### 2.解压出来
```
F:\gradle-8.3
```


## 二.环境变量配置
高级系统设置-环境变量

### 1.GRADLE_HOME 环境变量指向你的 Gradle 解压路径

结果：
![img123123.png](Gradle%E5%8F%8AIDEA%E8%AE%BE%E7%BD%AE%2Fimg123123.png)![img.png](Gradle及IDEA设置\img.png)


### 2.将 %GRADLE_HOME%\bin 添加到 Path 环境变量中

![img.png](Gradle%E5%8F%8AIDEA%E8%AE%BE%E7%BD%AE%2Fimg.png)

### 3.验证 gradle 是否安装成功，打开 cmd 命令行输入 gradle -v

![img_1.png](Gradle%E5%8F%8AIDEA%E8%AE%BE%E7%BD%AE%2Fimg_1.png)


## 三. 配置镜像仓库

### 1. 打开 \gradle-7.4.2\init.d\ 下的 init.gradle(没有就新建一个文件,建议notepad--打开) 
**[建议使用 notepad--打开  gitee开源](https://gitee.com/cxasm/notepad--/releases)** 



``` gradle
allprojects {
    repositories {
        mavenLocal()
        maven { name "Alibaba" ; url "https://maven.aliyun.com/repository/public" }
        mavenCentral()
    }

    buildscript { 
        repositories { 
            maven { name "Alibaba" ; url 'https://maven.aliyun.com/repository/public' }
        }
    }
}

```




### 2. 配置本地仓库

变量名：GRADLE_USER_HOME 变量值：自定义 Gradle 仓库目录

![img_2.png](Gradle%E5%8F%8AIDEA%E8%AE%BE%E7%BD%AE%2Fimg_2.png)


## 四. IDEA配置
![img_3.png](Gradle%E5%8F%8AIDEA%E8%AE%BE%E7%BD%AE%2Fimg_3.png)

详细教程参考：https://blog.csdn.net/GoodburghCottage/article/details/128169907

