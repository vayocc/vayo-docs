# 背景
JDK如此之多，应该选择那个厂子下面的JDK呢？

whichjdk网址:https://whichjdk.com/

这里不做过多描述具体可以看这位大佬的视频
[Java中有那么多JDK，应该选择哪一个呢？](https://www.bilibili.com/video/BV1wp421X7hu/?share_source=copy_web&vd_source=f69bae5ff5267647865299dac27e56d0)

# Adoptium Eclipse Temurin
官网地址:https://adoptium.net/

成员有azul,RedHat,Microsoft,HUAWEI,Google,AlibabaCloud ..  [详细](https://adoptium.net/members/)

说明：前身AdoptOpenJDK，后AdoptOpenJDK给Eclipse基金会后改名Adoptium Eclipse Temurin，后续维护工作就交给Eclipse基金会了。下面的members包含各种大厂。如果不怕花钱，可以选择Oracle JDK，最后Oracle JDK8免费版是jdk8u202，(但其实java版本一般选择奇数版本)想用后面的版本就得要舍得出钱了。如果不想花钱就用Adoptium Eclipse Temurin这个OpenJDK发行版，Adoptium Eclipse Temurin这个版本是大佬推荐的，某开源项目的dockerFile里面也是这个版本的镜像。
```dockerfile
## AdoptOpenJDK 停止发布 OpenJDK 二进制，而 Eclipse Temurin 是它的延伸，提供更好的稳定性
FROM eclipse-temurin:8-jre
#...
```


# 别的都省略
还有很多别的JDK这里省略，具体看B站大佬视频。
