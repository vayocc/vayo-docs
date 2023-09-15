---
title:   IDEA 教程之基础篇（二）：IntelliJ IDEA 快捷键大全 + 动图演示
date:   23-03-22 09:37:36 修改
author:  'zhangtao'
tags:
    -IDEA教程从入门到精通
    -idea
    -intellij-idea
    -intellij idea

---


>❤️ 个人主页：<a href="https://blog.csdn.net/weixin_67276852">水滴技术</a><br> 🚀 支持水滴：<strong>点赞</strong>👍 + <strong>收藏</strong>⭐ + <strong>留言</strong>💬<br> 🌸 订阅专栏：<a href="https://blog.csdn.net/weixin_67276852/category_11729708.html">IntelliJ IDEA 教程：从入门到精通</a>

大家好，我是水滴~~

本文参考了 IntelliJ IDEA 的官网，列举了IntelliJ IDEA（Windows 版）的所有快捷键。并在此基础上，为 90% 以上的快捷键提供了动图演示，能够直观的看到操作效果。

>官网地址：<a href="https://www.jetbrains.com/help/idea/reference-keymap-win-default.html">https://www.jetbrains.com/help/idea/reference-keymap-win-default.html</a>

该快捷键共分 16 种，可以方便的按各类查找自己需要的快捷键~~









### Ctrl + F9：构建项目

>该快捷键，等同于菜单【Build】—&gt;【Build Project】


![img](https://img-blog.csdnimg.cn/2d3dadd172a746f4a073f3e53005471a.png)


执行该命令后，IntelliJ IDEA 会编译项目中所有类，并将编译结果输出到out目录中。IntelliJ IDEA 支持增量构建，会在上次构建的基础上，仅编译修改的类。 ![img](https://img-blog.csdnimg.cn/0a9576b4bc66493c99476c52bdaaa7e2.gif)

### Ctrl + Shift + F9：重新编译当前类

>该快捷键，等同于菜单【Build】—&gt;【Recompile ‘class name’】



![img](https://img-blog.csdnimg.cn/04881e4092d9412c8f71d5dc32e01884.png) 在IntelliJ IDEA 中打开要编译的类，执行该命令会编译当前类。 ![img](https://img-blog.csdnimg.cn/0c0da1f7a8184340b0498e56fb0d96ca.gif)


### Ctrl + X：剪切

剪切选中文本，若未选中则剪切当前行。


![img](https://img-blog.csdnimg.cn/ba963adf5f194fbebc077f0895a9ed6d.gif)

### Ctrl + C：复制

复制选中文本，若未选中则复制当前行。

### Ctrl + V：粘贴

### Ctrl + Alt + Shift + V：粘贴为纯文本

### Ctrl + Shift + V：从历史选择粘贴

从历史剪粘版中选择要粘贴的内容。


![img](https://img-blog.csdnimg.cn/ef65ef617a464a10a9a439ff869b9f67.gif)

### Ctrl + D：复制行

复制光标所在行。


![img](https://img-blog.csdnimg.cn/9dbba27a7f9f4d0695a8fb408194b04b.gif)

### Ctrl + Shift + C：复制文件路径

复制选中文件所在路径。


![img](https://img-blog.csdnimg.cn/9c340c5cdea6486ca3c04256e56b900f.gif)

### Ctrl + Alt + Shift + C：复制引用

复制包的路径，或者类的名称。


![img](https://img-blog.csdnimg.cn/c1ed398d88ce45a091ef7f5cc2703fd8.gif)

### Ctrl + S：保存全部

### Ctrl + Z：撤销

撤销上一步操作内容。

### Ctrl + Shift + Z：重做

恢复上一步撤销内容。


![img](https://img-blog.csdnimg.cn/be1180ed1fc649e982f83f87d16992f6.gif)

### Tab：缩进

### Shift + Tabl：取消缩进


![img](https://img-blog.csdnimg.cn/46ff0ec9f69e485ab327ad17885a0001.gif)

### Ctrl + Alt + I：自动缩进行

自动缩进至规范位置。


![img](https://img-blog.csdnimg.cn/714beeb6e5eb463fa44e7b186d38fd75.gif)

### Shift + Enter：开始新行

无论光标是否在行尾，都开始新的行。


![img](https://img-blog.csdnimg.cn/d0a7000e605e41788fe44586a2fd0fc3.gif)

### Ctrl + Alt + Enter：在当前行之前开始新行


![img](https://img-blog.csdnimg.cn/079fc9c5db2b4bdbb3ca292d9990e26e.gif)

### Ctrl + Y：删除行

删除当前行。


![img](https://img-blog.csdnimg.cn/35f2220922dc4a48983f6bbf3a39e3ed.gif)

### Ctrl + Shift + U：大小写转换


![img](https://img-blog.csdnimg.cn/ff5acc373e2140bdb7069f60d8129925.gif)

### Ctrl + Alt + Shift + Insert：创建临时文件

可以创建各种类型的临时文件，该临时文件不会保存到磁盘中。


![img](https://img-blog.csdnimg.cn/1943548ff7704491bc29bde1a1f22ae3.gif)

### Shift + F4：在新窗口中打开

在新窗口打开当前文件。


![img](https://img-blog.csdnimg.cn/4e16c45d0ed0460082e80e4ba945be58.gif)


### Ctrl + Left：左移一个单词


![img](https://img-blog.csdnimg.cn/b80a3360066e47b18ea84e44d026c774.gif)

### Ctrl + Right：右移一个单词


![img](https://img-blog.csdnimg.cn/8818f1dc9d4c47a69e3e7d4f80c7db49.gif)

### Home：移动至行首

### End：移动至行尾


![img](https://img-blog.csdnimg.cn/8c68a8020d514a59bb8b759160c9a913.gif)

### Ctrl + Shift + M：移动至大括号

多次按下快捷键，可以在左右两个大括号间切换。


![img](https://img-blog.csdnimg.cn/5a6a33db89c9474c899601d38c311a97.gif)

### Ctrl + [：移动至代码块开始

### Ctrl + ]：移动至代码块末尾


![img](https://img-blog.csdnimg.cn/551938c94cda45839acce8c3d2e141d5.gif)

### Alt + Down：下一个方法

### Alt + Up：上一个方法


![img](https://img-blog.csdnimg.cn/65e33174dc8b4900901bfd116aa8790f.gif)

### Ctrl + PageUp：移动至页面顶部

### Ctrl + PageDown：移动至页面底部


![img](https://img-blog.csdnimg.cn/2faf5fe547f24a278eb0aa7adfaa209d.gif)

### PageUp：向上翻页

### PageDown：向下翻页


![img](https://img-blog.csdnimg.cn/ad92de13292148379d5c0fb66cff5926.gif)

### Ctrl + Home：移动至文件开头

### Ctrl + End：移动至文件末尾


![img](https://img-blog.csdnimg.cn/2974c4677ebc49dbb381a4f9e14c09f6.gif)


### Ctrl + A：全选

### Shift + Left：向左选择

### Shift + Right：向右选择


![img](https://img-blog.csdnimg.cn/4d21a18d8dfc4700abe399df9fcad5ec.gif)

### Ctrl + Shift + Left：向左选择一个单词

### Ctrl + Shift + Right：向右选择一个单词


![img](https://img-blog.csdnimg.cn/39b5ce84c32949c292fed2673f195b51.gif)

### Shift + Home：向左选择至行头

### Shift + End：向右选择至行尾


![img](https://img-blog.csdnimg.cn/c6c8be7bd0f4409a98992883af8572ea.gif)

### Shift + Up：向上选择

### Shift + Down：向下选择


![img](https://img-blog.csdnimg.cn/f7c3fb94d07d460aba83fe6dfbcab441.gif)

### Ctrl + Shift + [：选择至代码块开头

### Ctrl + Shift + ]：选择至代码块结尾


![img](https://img-blog.csdnimg.cn/66a2ec10cd3d415791654062ac897e1c.gif)

### Ctrl + Shift + PageUp：选择至页面顶部

### Ctrl + Shift + PageDown：选择至页面底部


![img](https://img-blog.csdnimg.cn/94a2859aa5024ba597661cb0c6feabbb.gif)

### Shift + PageUp：向上翻页选择

### Shift + PageDown：向下翻页选择


![img](https://img-blog.csdnimg.cn/8202de635dc34a779a4d2d2e7bee678a.gif)

### Ctrl + Shift + Home：选择至文件开关

### Ctrl + Shift + End：选择至文件结尾


![img](https://img-blog.csdnimg.cn/a04f5b2937f84c9aa6ab98ac5ca831c2.gif)

### Ctrl + W：扩展选择

### Ctrl + Shift + W：收缩选择


![img](https://img-blog.csdnimg.cn/ed03a89010b849d792d3d14cbbfa2575.gif)


### Ctrl + NumPad+：展开代码块

### Ctrl + NumPad-：折叠代码块


![img](https://img-blog.csdnimg.cn/3fe550a3ee6b47d59e227a734e6683c2.gif)

### Ctrl + Alt + NumPad+：递归展开

### Ctrl + Alt + NumPad-：递归折叠


![img](https://img-blog.csdnimg.cn/49968c30ec584504a0f8dc24e2cf769d.gif)

### Ctrl + Shift + NumPad+：全部展开

### Ctrl + Shift + NumPad-：全部折叠


![img](https://img-blog.csdnimg.cn/4d1afb9746d84893abc59af64783ee30.gif)

### Ctrl + .：折叠选择


### Alt + Shift + Click：添加/删除插入符号


![img](https://img-blog.csdnimg.cn/cc1980f2dacd4e7aa310fa8ace0bb995.gif)

### Alt + Shift + Insert：切换列选择模式


![img](https://img-blog.csdnimg.cn/ed6d6e2d9b644debac59e9eb097ba198.gif)

### 双击Ctrl + Up：向上克隆插入符号

按Ctrl键两次，然后在不松开的情况下按向上箭头键。


![img](https://img-blog.csdnimg.cn/42077a8085d24aaab78224d034138624.gif)

### 双击Ctrl + Down：向下克隆插入符号

按Ctrl键两次，然后在不松开的情况下按向下箭头键。


![img](https://img-blog.csdnimg.cn/e567d8d965654a9caf7281eefd4443b5.gif)

### Alt + Shift + G：将插入符号添加到选择中的每一行


![img](https://img-blog.csdnimg.cn/e87a0ad15e884a259d6d97a7e064a933.gif)

### Alt + J：选择单位下次出现的位置

### Alt + Shift + J：取消最后一次选择


![img](https://img-blog.csdnimg.cn/fbe0d9f5fc1249b794de7b7ee3e4ca4d.gif)

### Ctrl + Alt + Shift + J：选择所有出现的位置


![img](https://img-blog.csdnimg.cn/7574314a8c1242069f5c7b5d885bd982.gif)

### Alt + Shift + Middle-Click：创建矩形选择


![img](https://img-blog.csdnimg.cn/6b6f6b9f460848c9af8e1a9be5816516.gif)

### Alt + Click：拖拽以创建矩形选择区


![img](https://img-blog.csdnimg.cn/d3548110c7ba43cd98212482d9c61bbb.gif)

### Ctrl + Alt + Shift + Click：拖拽以创建多个矩形选择区


![img](https://img-blog.csdnimg.cn/a852227b2fa948db96fd952a7b78f99d.gif)


### Alt + Enter：显示建议操作

该快捷键又称为“万通快捷键”，它会根据不同的语境建议不同的操作。下面这个演示只是其中的一种，还有很多种用法，你可以尝试一下。


![img](https://img-blog.csdnimg.cn/371fa9207ae1460795a8a2c2f5521ec6.gif)

### Ctrl + Space：代码补全


![img](https://img-blog.csdnimg.cn/c89503e3b08741d0bc860399ffb6c016.gif)

### Ctrl + Shift + Space：类型匹配代码补全


![img](https://img-blog.csdnimg.cn/0892dac19ec843049b6005a8eee27d05.gif)

### Ctrl + Alt + Space：第二次代码补全


![img](https://img-blog.csdnimg.cn/7090a150a8da43dda25597709823ea70.gif)

### Ctrl + Shift + Enter：补全当前语句


![img](https://img-blog.csdnimg.cn/493e2c73788f43fca9cd7bd9e61e2ee4.gif)

### Ctrl + Alt + L：格式化代码


![img](https://img-blog.csdnimg.cn/f04e3f89999047bd819115947ac47bfd.gif)

### Ctrl + P：参数信息提醒


![img](https://img-blog.csdnimg.cn/f3d987b1cbee4f23a44d86ca5ef8819d.gif)

### Ctrl + Q：快速文档


![img](https://img-blog.csdnimg.cn/54ec5a385a7944e98958338b30da985c.gif)

### Ctrl + Shift + Up：向上移动语句

### Ctrl + Shift + Down：向下移动语句


![img](https://img-blog.csdnimg.cn/d915a7e024c543a6aaa5936b205a0ec8.gif)

### Ctrl + Alt + Shift + Left：向左移动元素

### Ctrl + Alt + Shift + Right：向右移动元素


![img](https://img-blog.csdnimg.cn/3ce61ba21e234683b03d73387b057ed8.gif)

### Alt + Shift + Up：向上移动队列

### Alt + Shift + Down：向下移动队列


![img](https://img-blog.csdnimg.cn/74e0ac26186d476b89243a6be8d96fb1.gif)

### Ctrl + /：添加行注释


![img](https://img-blog.csdnimg.cn/e2ce7eb41c0045e8931de8ae777436eb.gif)

### Ctrl + Shift + /：添加块注释


![img](https://img-blog.csdnimg.cn/4c70509e6b964ca994093f3e3b175444.gif)

### Alt + Insert：生产语句


![img](https://img-blog.csdnimg.cn/7b086520fc0c4bb8977058994358df1a.gif)


### Alt + Down：跳转至下一个方法

### Alt + Up：跳转至上一个方法


![img](https://img-blog.csdnimg.cn/0c846696b7724613bc64087457f84166.gif)

### Ctrl + G：跳转到指定行


![img](https://img-blog.csdnimg.cn/494e2f1d1fa641e8a6077189e75fd9f6.gif)

### Ctrl + Tab：切换活动文件


![img](https://img-blog.csdnimg.cn/085bbf77056542a2b5b4a14fac825a10.gif)

### Alt + F1：选择文件的定位


![img](https://img-blog.csdnimg.cn/b7b3a3e4c22a458e9ac013795339d5a5.gif)

### Ctrl + E：最近的文件


![img](https://img-blog.csdnimg.cn/d6875a50b6e34837bb94172d28847094.gif)

### Ctrl + Shift + Backspace：返回上次编辑位置


![img](https://img-blog.csdnimg.cn/6998a799f030469690e556e36e7ce008.gif)

### Ctrl + Alt + Left：后退

### Ctrl + Alt + Right：前进


![img](https://img-blog.csdnimg.cn/6ebc1ad4eee64583ae0ee245c5d0702a.gif)

### Ctrl + Alt + Down：下一事件

### Ctrl + Alt + Up：上一事件


![img](https://img-blog.csdnimg.cn/85bcc3b78b88469089a58d77c4366e74.gif)

### Alt + Right：选择下一个选项卡

### Alt + Left：选择下一个选项卡


![img](https://img-blog.csdnimg.cn/89c87b36451b486c82a5726e9efccf44.gif)

### F11：切换匿名书签


![img](https://img-blog.csdnimg.cn/f34f42766d6c422f9ccab5137d2144f6.gif)

### Ctrl + Shift + [digit]：用数字切换书签


![img](https://img-blog.csdnimg.cn/6e06898844164a859b25ef8f8a57f356.gif)

### Ctrl + F11：使用助词符切换书签


![img](https://img-blog.csdnimg.cn/ea468949076c4de1803209483cb562b8.gif)

### Shift + F11：显示所有书签


![img](https://img-blog.csdnimg.cn/0ea69e74fafe4990bec2ef8f469c9b9e.gif)

### Ctrl + [digit]：用数字跳转到书签


![img](https://img-blog.csdnimg.cn/e1d7c4b05101473590f602bd1c942fb1.gif)

### Alt + 7：显示结构窗口


![img](https://img-blog.csdnimg.cn/87a56697a2aa4c23ac5c4ff104ed2fcc.gif)

### Alt + 3：显示查找窗口


![img](https://img-blog.csdnimg.cn/97af9e1d176b4afcad4c42b8f80438f6.gif)


### 双击Shift：查找所有


![img](https://img-blog.csdnimg.cn/5d19e3e8345d4fe5babbb8d3548d5ca6.gif)

### Ctrl + F：查找字符（当前文件）


![img](https://img-blog.csdnimg.cn/f7097b553dbf4746a852f37eb33b82a5.gif)

### F3：查找下一个

### Shift + F3：查找上一个


![img](https://img-blog.csdnimg.cn/e1a0d8c99c264698a97f919ecc7dc075.gif)

### Ctrl + R：替换字符（当前文件）


![img](https://img-blog.csdnimg.cn/0a5f84b14a14462bbf87dcddb6081a69.gif)

### Ctrl + Shift + F：查找字符（所有文件）


![img](https://img-blog.csdnimg.cn/ddc4beeb20b94ff7a0c09fc14c102469.gif)

### Ctrl + Shift + R：替换字符（所有文件）


![img](https://img-blog.csdnimg.cn/692c58fc5bc542dcb8e2a3bdc711d043.gif)

### Ctrl + F3：跳转到光标处单词的下一位置


![img](https://img-blog.csdnimg.cn/c06cf22bc8c842a182852402f22b82e1.gif)

### Ctrl + Shift + N：查找文件并跳转


![img](https://img-blog.csdnimg.cn/e50515c71410498dbf21b0789da24641.gif)

### Ctrl + F12：打开文件结构


![img](https://img-blog.csdnimg.cn/cf2c4c5a32ad405289d5f446103fd44f.gif)

### Ctrl + Alt + Shift + N：查找符号（变量、方法等）


![img](https://img-blog.csdnimg.cn/1fbfd2d7706f479a974d6356c737ef39.gif)

### Ctrl + Shift + A：查找动作


![img](https://img-blog.csdnimg.cn/06e627eb36f74566b73cb7347d6bf0a7.gif)


### Alt + F7：查找用法

### Ctrl + B：跳转到声明处


![img](https://img-blog.csdnimg.cn/b1ed908240f444f58bafa2f469a09a66.gif)

### Ctrl + Shift + B：跳转到声明类处


![img](https://img-blog.csdnimg.cn/6c0478efac1e4ac3ab4386a0eaa19487.gif)

### Ctrl + Alt + F7：显示用法

### Ctrl + U：跳转到超级方法

### Ctrl + Alt + B：跳转到实现方法


![img](https://img-blog.csdnimg.cn/2025bcf65b7d41ce8c324798158ecdab.gif)

### Ctrl + Shift + F7：突出显示文件中的用法


### Alt + Enter：显示意图操作


![img](https://img-blog.csdnimg.cn/6510a1ef14ca43c598840cdb6af73eb1.gif)

### Ctrl + F1：显示错误描述


![img](https://img-blog.csdnimg.cn/791b5ed976654efe8250a7b9006def16.gif)

### F2：下一个突出显示的错误

### Shift + F2：上一个突出显示的错误


![img](https://img-blog.csdnimg.cn/159e9c8f850749cca21f1e8c58c7a949.gif)

### Ctrl + Alt + Shift + I：按名称运行检查


![img](https://img-blog.csdnimg.cn/43f2263b1a324184acaff8a80021246e.gif)

### Alt + 6：显示问题窗口


![img](https://img-blog.csdnimg.cn/3654780a8ebf4c85abd0f4c2814a2ef3.gif)


### 双击Ctrl：运行所有


![img](https://img-blog.csdnimg.cn/794c69a78c4542ba8a56240064a12cb7.gif)

### Shift + F10：运行上下文配置


![img](https://img-blog.csdnimg.cn/609833479f1047f29365249344860abe.gif)

### Alt + Shift + F10：打开运行窗口


![img](https://img-blog.csdnimg.cn/02bf116033724e46aff7df5d649407ea.gif)

### Shift + F9：调试上下文配置


![img](https://img-blog.csdnimg.cn/2f2196226f8f4225ac9ac03dece7e90a.gif)

### Alt + Shift + F9：打开调试窗口


![img](https://img-blog.csdnimg.cn/07e4994fda7b4ede90c3913fc6dac78a.gif)

### Ctrl + Alt + F5：附加到进程

### Ctrl + F2：停止


![img](https://img-blog.csdnimg.cn/69b16b0010354e85a4d40d2ef38b3bea.gif)

### F9：运行至下一断点


![img](https://img-blog.csdnimg.cn/a9134a8b348647b6aa862473d2a12abf.gif)

### Ctrl + Shift + F2：停止后台进程

### F8：跨过调用


![img](https://img-blog.csdnimg.cn/7d4fd6818efd44eca3de5aa38fe964ea.gif)

### Alt + Shift + F8：强制跨过调用

### F7：进入调用


![img](https://img-blog.csdnimg.cn/54e822901ca24ff4abd342591d0413d3.gif)

### Shift + F7：智能进入调用

### Alt + Shift + F7：强制进入调用

### Shift + F8：跳出调用


![img](https://img-blog.csdnimg.cn/3560263d26da4f73a41120d0c1f08c87.gif)

### Alt + F9：运行至光标处


![img](https://img-blog.csdnimg.cn/4eebb9f8d51b45f4b1536946ca6d4269.gif)

### Ctrl + Alt + F9：强制运行至光标处

### Alt + F10：显示执行点


![img](https://img-blog.csdnimg.cn/431760f3b33f419bbe80e83552ef100d.gif)

### Alt + F8：评估表达式

### Ctrl + Alt + F8：快速评估表达式

### Ctrl + F8：切换行断点


![img](https://img-blog.csdnimg.cn/da5ce3f846aa4e7db8e04ebb2ce6bd02.gif)

### Ctrl + Alt + Shift + F8：切换临时行断点


![img](https://img-blog.csdnimg.cn/e79eaee370b04993bce84b4187ef2988.gif)

### Ctrl + Shift + F8：查看断点


![img](https://img-blog.csdnimg.cn/395a662231db460fb0252dcc8329be72.gif)

### Ctrl + Shift + F8：编辑断点


![img](https://img-blog.csdnimg.cn/c4fc107f9fbd4883ba94e9c50b058213.gif)

### Alt + 4：显示运行窗口

### Alt + 5：显示调试窗口

### Alt + 8：显示服务窗口


![img](https://img-blog.csdnimg.cn/37143ac358174cdfa5ef2de10778e0eb.gif)


### Ctrl + Alt + Shift + T：打开重构列表


![img](https://img-blog.csdnimg.cn/635111af2ea548b386b87e004e61aaec.gif)

### Shift + F6：修改名称

### Ctrl + F6：修改签名

### Ctrl + Alt + N：内联

### F6：移动

### Ctrl + Alt + M：提取方法


![img](https://img-blog.csdnimg.cn/bb58bb4a0e18434b87aa6ca6cc2cd8bc.gif)

### Ctrl + Alt + F：引入域

### Ctrl + Alt + P：引入参数

### Ctrl + Alt + V：引入变量

### Alt + Delete：安全删除


### `Alt + `` ：弹出 CVS 窗口


![img](https://img-blog.csdnimg.cn/22c1629f938640258189513e11577ddb.gif)

### Ctrl + K：提交


![img](https://img-blog.csdnimg.cn/e50075acdd52481b803eb35ee1bf8179.gif)

### Ctrl + T：更新项目


![img](https://img-blog.csdnimg.cn/db6203efd97543e6a72fa3640b3e2db1.gif)

### Ctrl + Alt + Z：回滚


![img](https://img-blog.csdnimg.cn/9af90d76bf304638ba59f263fbe38c72.gif)

### Ctrl + Shift + K：拉取


![img](https://img-blog.csdnimg.cn/69976af115ae497291d54b22e58b54e9.gif)

### Ctrl + Alt + Shift + Down：下一个修改

### Ctrl + Alt + Shift + Up：上一个修改

### Alt + 9：显示版本控制窗口

### Alt + 0：显示提交窗口


![img](https://img-blog.csdnimg.cn/7b3acb389b89427c93db5fdbf95b2556.gif)


### F7：下一个差异

### Shift + F7：上一个差异


![img](https://img-blog.csdnimg.cn/53a52397a3be4dce855b079d7a4834d5.gif)

### Ctrl + Alt + R：接受左侧

### Ctrl + Alt + A：接受右侧


![img](https://img-blog.csdnimg.cn/0b2e3e6766464d0aaa4b7e96ac9f1620.gif)

### Ctrl + Shift + Tab：选择对面的差异窗格


![img](https://img-blog.csdnimg.cn/0ef49971918f4d929c569d0f0599ce45.gif)

### Ctrl + Shift + D：显示差异设置窗口


### Shift + Escape：隐藏活动的工具窗口


![img](https://img-blog.csdnimg.cn/1cb7303d6dc5458982c2bec5835c0c38.gif)

### Ctrl + Shift + F12：隐藏所有工具窗口


![img](https://img-blog.csdnimg.cn/42b9da936e264c3d8ec5d20a27860404.gif)

### F12：跳转到最后一个工具窗口

### Ctrl + Alt + Shift + Left：向左延伸窗口大小

### Ctrl + Alt + Shift + Right：向右延伸窗口大小


![img](https://img-blog.csdnimg.cn/bf8bd51e33e946019ae8ee3206284a30.gif)

### Ctrl + Alt + Shift + Up：向顶部延伸窗口大小

### Ctrl + Alt + Shift + Down：向底部延伸窗口大小


![img](https://img-blog.csdnimg.cn/29496cdc3b1544de9970eb558f2fda0a.gif)

### Alt + 1：显示项目窗口

### Alt + 2：显示书签窗口

### Alt + 3：显示查找窗口

### Alt + 4：显示运行窗口

### Alt + 5：显示调试窗口

### Alt + 6：显示问题窗口

### Alt + 7：显示结构窗口

### Alt + 8：显示服务窗口

### Alt + 9：显示版本控制窗口

### Alt + 0：显示提交窗口


![img](https://img-blog.csdnimg.cn/e7d7e453bc2047978a3c939814425694.gif)

### Alt + F12：显示终端窗口


![img](https://img-blog.csdnimg.cn/bc679af9f0d4439880309430c1234471.gif)


![img](https://img-blog.csdnimg.cn/0fedba8ac83c4e66964ac2f616197027.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rC05ru0VjI=,size_20,color_FFFFFF,t_70,g_se,x_16)

