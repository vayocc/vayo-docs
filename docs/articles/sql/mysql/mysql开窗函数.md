
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

![mysql开窗函数/a5d8c369-ee46-44a5-8134-84b73b2dae03.png](mysql开窗函数/a5d8c369-ee46-44a5-8134-84b73b2dae03.png)



--- 
最后加一个自己遇见过的案例

left join media表 media要取proid 一致的 并且 sort 最小的那个值


::: details  这里面包括表设计 sql写法全部都不建议
```sql
-- --  方案一：先order再group 必须要加limit在8.0上面 不加proid的话查询是0.638s 加在order里面是 0.2s
SELECT   any_value(MEDIO_ID) MEDIO_ID   from (
 SELECT  SORT_NO , any_value(PRO_ID) as PRO_ID  ,any_value(MEDIO_ID) MEDIO_ID
        FROM pro_medio  where  C_STATUS = "1"   and PAGE_CODE = "02"
        AND TYPE = "05" and PRO_ID = '2ebf497442a8fde45863'ORDER BY SORT_NO asc limit 10 )  tmpTable
				GROUP BY tmpTable.PRO_ID ; -- 竟然不行 要加limit 

-- 方案二：采用先分组再关联   比方案1慢一点 加上proid是0.5s  不加的话是1.2s
select a.* from pro_medio a inner join 
 (select min(SORT_NO) as SORT_NO, PRO_ID as PRO_ID 
                from pro_medio group by PRO_ID) as coo
on a.SORT_NO = coo.SORT_NO and a.PRO_ID = coo.PRO_ID
where a.C_STATUS = "1"   and a.PAGE_CODE = "02"
        AND a.TYPE = "05"  and a.PRO_ID = '2ebf497442a8fde45863';
				
--  方案三：采用相关子查询  时间太久
select a.SORT_NO , a.PRO_ID,a.MEDIO_ID from pro_medio a 
where a.SORT_NO = (select min(b.SORT_NO) from pro_medio b where b.PRO_ID = a.PRO_ID);

--  开始
        

-- 方案四 开窗函数 外面加上proid执行速度0.2s 不加的话 1S
select MEDIO_ID  from(
  select row_number() over (partition by PRO_ID order by SORT_NO asc) as rn,u.*
  from pro_medio u 
) t where t.rn=1 and PRO_ID = '2ebf497442a8fde45863';
```
:::
💡 这个实现很烂
参考过group写法：https://zhuanlan.zhihu.com/p/414683659

开窗函数group参考：https://blog.csdn.net/cqkxzyi/article/details/86301731

