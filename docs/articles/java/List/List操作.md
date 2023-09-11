


# list 取差集 并集

<aside>
💡 不要用这个了 hutool里有collUtil的工具类很好用
</aside>


::: details 原commons-collections4方法


```java
<dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-collections4</artifactId>
            <version>4.4</version>
        </dependency>
```

**`import** org.apache.commons.collections4.CollectionUtils;`

差集

```java
// 取差集: 传递进来的参数 - 缓存中查到的 = 缓存中没有的
Collection<Long> subtractIds = CollectionUtils.subtract(
        goodIds.stream()
                .map(g -> Long.valueOf(g.toString())).collect(Collectors.toList()),
        left.stream()
                .map(SimpleGoodsInfo::getId).collect(Collectors.toList())
);
```

并集

```java
// 合并 left 和 right 并返回
log.info("get simple goods info by ids (from db and cache): [{}]",
        JSON.toJSONString(subtractIds));
return new ArrayList<>(CollectionUtils.union(left, right));
```
:::
