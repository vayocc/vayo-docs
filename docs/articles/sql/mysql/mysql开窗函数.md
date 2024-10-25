
# 开窗函数的语法结构：

分析函数名() over(partition by 分组列名 order by 排序列名 rows between 开始位置 and 结束位置)
over()函数 中包括三个函数：包括分区partition by 列名、排序order by 列名、指定窗口范围rows between 开始位置 and 结束位置
rows between … and … 用得较少

# ROW_NUMBER()

![mysql开窗函数/a2c1be25-cc70-4adb-a074-bba27754cfe7.png](mysql开窗函数/a2c1be25-cc70-4adb-a074-bba27754cfe7.png)

# RANK()

![mysql开窗函数/177b92aa-0703-423f-b574-6a1a2782e7bf.png](mysql开窗函数/177b92aa-0703-423f-b574-6a1a2782e7bf.png)

# DENSE_REANK();

![mysql开窗函数/bf97063f-dacc-4452-ac64-ef27d6e825d2.png](mysql开窗函数/bf97063f-dacc-4452-ac64-ef27d6e825d2.png)

# 聚合函数 SUM（） PARTITION 的方式

![mysql开窗函数/b513b663-ecc4-4c12-a4ab-2bf0c4ad3113.png](mysql开窗函数/b513b663-ecc4-4c12-a4ab-2bf0c4ad3113.png)

## 用普通写法写的sum

![mysql开窗函数/ce152016-8974-4bfc-b5e5-a96965bac00b.png](mysql开窗函数/ce152016-8974-4bfc-b5e5-a96965bac00b.png)

改成开窗函数

![mysql开窗函数/5469338e-235a-4271-af19-9d80d9c96c95.png](mysql开窗函数/5469338e-235a-4271-af19-9d80d9c96c95.png)

---

---

# lag() lead()

![mysql开窗函数/8075acfc-1f3f-4cbc-8f79-58cdeb64e738.png](mysql开窗函数/8075acfc-1f3f-4cbc-8f79-58cdeb64e738.png)

![mysql开窗函数/93c8ba10-70e2-4a84-b8ad-956c1210e769.png](mysql开窗函数/93c8ba10-70e2-4a84-b8ad-956c1210e769.png)
[operateElement.ts](..%2F..%2F..%2F..%2F..%2F..%2FUsers%2Fitino%2Fdoc%2Fwechat%2FWeChat%20Files%2Fmo102217893%2FFileStorage%2FFile%2F2024-10%2FoperateElement.ts)
![mysql开窗函数/a5d8c369-ee46-44a5-8134-84b73b2dae03.png](mysql开窗函数/a5d8c369-ee46-44a5-8134-84b73b2dae03.png)



--- 




💡 这个实现很烂
参考过group写法：https://zhuanlan.zhihu.com/p/414683659

开窗函数group参考：https://blog.csdn.net/cqkxzyi/article/details/86301731

