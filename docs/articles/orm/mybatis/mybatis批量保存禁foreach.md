---
title: mybatis批量保存 禁止使用foreach
---

# mybatis批量保存 禁止使用foreach

[MyBatis批量插入几千条数据，请慎用foreach](https://www.modb.pro/db/174751)

附 官方文档

[Insert Statements](https://mybatis.org/mybatis-dynamic-sql/docs/insert.html#batch-insert-support)

```yaml
...
  try(SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
  SimpleTableMapper mapper = session.getMapper(SimpleTableMapper.class);
  List<SimpleTableRecord> records = getRecordsToInsert(); // not shown

  BatchInsert<SimpleTableRecord> batchInsert = insert(records)
  .into(simpleTable)
  .map(id).toProperty("id")
  .map(firstName).toProperty("firstName")
  .map(lastName).toProperty("lastName")
  .map(birthDate).toProperty("birthDate")
  .map(employed).toProperty("employed")
  .map(occupation).toProperty("occupation")
  .build()
  .render(RenderingStrategies.MYBATIS3);

  batchInsert.insertStatements().forEach(mapper::insert);

  session.commit();
  }
...
```

| 方式       |   50条   |  100条   |  500条   |  1000条   |
|----------|:-------:|:-------:|:-------:|:--------:|
| 批处理      |  159ms  |  208ms  |  305ms  |  432ms   |
| xml拼接sql |  208ms  |  232ms  |   报错    |    报错    |
| 反复单挑插入   | 1013ms  | 2266ms  | 8141ms  | 18861ms  |



**二、mybatis ExecutorType.BATCH**

Mybatis内置的ExecutorType有3种，默认的是simple，该模式下它为每个语句的执行创建一个新的预处理语句，单条提交sql；而batch模式重复使用已经预处理的语句，并且批量执行所有更新语句，显然batch性能将更优；
但batch模式也有自己的问题，比如在Insert操作时，在事务没有提交之前，是没有办法获取到自增的id，这在某型情形下是不符合业务要求的

具体用法如下:

- **方式一 spring+mybatis 的**

```java
//获取sqlsession
    //从spring注入原有的sqlSessionTemplate
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public void test() {
        // 新获取一个模式为BATCH，自动提交为false的session
        // 如果自动提交设置为true,将无法控制提交的条数，改为最后统一提交，可能导致内存溢出
        SqlSession session = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH,false);
        //通过新的session获取mapper
        fooMapper = session.getMapper(FooMapper.class);
        int size = 10000;
        try{

            for(int i = 0; i < size; i++) {

                Foo foo = new Foo();
                foo.setName(String.valueOf(System.currentTimeMillis()));
                fooMapper.insert(foo);
                if(i % 1000 == 0 || i == size - 1) {
                    //手动每1000个一提交，提交后无法回滚
                    session.commit();
                    //清理缓存，防止溢出
                    session.clearCache();
                }
            }
        } catch(Exception e) {
            //没有提交的数据可以回滚
            session.rollback();
        } finally{

            session.close();
        }
    }
spring+mybatis
```

**方法二:**

**结合通用mapper sql别名最好是包名＋类名**

```java
public void insertBatch(Map<String, Object> paramMap, List<User> list) throws Exception {
        // 新获取一个模式为BATCH，自动提交为false的session
        // 如果自动提交设置为true,将无法控制提交的条数，改为最后统一提交，可能导致内存溢出
        SqlSession session = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH, false);
        try {
            if (null != list || list.size() > 0) {

                int lsize = list.size();
                for (int i = 0, n = list.size(); i < n; i++) {
                    User user = list.get(i);
                    user.setIndate((String) paramMap.get("indate"));
                    user.setDatadate((String) paramMap.get("dataDate"));//数据归属时间
                    //session.insert("com.xx.mapper.UserMapper.insert",user);
                    //session.update("com.xx.mapper.UserMapper.updateByPrimaryKeySelective",_entity);
                    session.insert(“包名 + 类名", user);
                    if ((i > 0 && i % 1000 == 0) || i == lsize - 1) {
                        // 手动每1000个一提交，提交后无法回滚
                        session.commit();
                        // 清理缓存，防止溢出
                        session.clearCache();
                    }
                }
            }
        } catch (Exception e) {
            // 没有提交的数据可以回滚
            session.rollback();
            e.printStackTrace();
        } finally {

            session.close();
        }
    }
```
