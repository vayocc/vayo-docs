# List根据另一个列表自定义排序
## DEMO代码

```java
		List<Book> bookList = new ArrayList<>();
        bookList.add(new Book(1, "Book A", "Author X", "ISBN123", List.of("Fiction"), "2021-01-01"));
        bookList.add(new Book(2, "Book B", "Author Y", "ISBN456", List.of("Non-fiction"), "2021-02-01"));
        bookList.add(new Book(3, "Book C", "Author Z", "ISBN789", List.of("Fiction", "Mystery"), "2021-03-01"));

		// 自定义排序列表
        List<String> orderList = new ArrayList<>();
        orderList.add("Book C");
        //orderList.add("Book A");
        orderList.add("Book B");
        //  自定义排序
        //indexOf不命中 默认排到排到最前面
        // Collections.sort(bookList, Comparator.comparingInt(b -> orderList.indexOf(b.name)));
     
        // indexOf不命中 的排到最后面面
        Collections.sort(bookList, Comparator.comparingInt(b -> {
            int index = orderList.indexOf(b.name);
            return index != -1 ? index : Integer.MAX_VALUE;
        }));

        // 输出排序后的列表
        for (Book book : bookList) {
            System.out.println(book.name + " - " + book.author);
        }
```

我们使用`Comparator.comparingInt()`方法和一个**lambda**表达式来实现自定义排序。

`orderList.indexOf(b.name)`将返回`b.name`在`orderList`中的索引，然后`Comparator.comparingInt()`使用这些索引进行比较。

在lambda表达式中，我们首先使用`orderList.indexOf(b.name)`获取`b.name`在`orderList`中的索引。如果索引不等于-1，表示`b.name`在`orderList`中存在，我们返回该索引作为排序依据。否则，我们返回`Integer.MAX_VALUE`，将不在`orderList`中的`Book`对象排在最后。


## 自定义排序列表不存在排前面
默认的就是
```java
Collections.sort(bookList, Comparator.comparingInt(b -> orderList.indexOf(b.name)));
```

## 自定义排序列表不存在排后面
```java
 Collections.sort(bookList, Comparator.comparingInt(b -> {
            int index = orderList.indexOf(b.name);
            return index != -1 ? index : Integer.MAX_VALUE;
        }));
```

## 如果是两个`List<String>`排序的话用
```java
Collections.sort(list1, Comparator.comparingInt(list2::indexOf)); // 如果list1，list2都是List<String>
```

# List分区


💡 不要用这个了 hutool里有ListUtil的工具类中的partition方法


::: details 原文：java8 Stream 大数据量List分批处理

java8 Stream 大数据量List分批处理
   [参考](https://blog.csdn.net/fzy629442466/article/details/84765070)

```java
//按每3个一组分割
private static final Integer MAX_NUMBER = 3;

/**
* 计算切分次数
*/
private static Integer countStep(Integer size) {
	return (size + MAX_NUMBER - 1) / MAX_NUMBER;
}

public static void main(String[] args) {
      List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
      int limit = countStep(list.size());
      //方法一：使用流遍历操作
      List<List<Integer>> mglist = new ArrayList<>();
      Stream.iterate(0, n -> n + 1).limit(limit).forEach(i -> {
          mglist.add(list.stream().skip(i * MAX_NUMBER).limit(MAX_NUMBER).collect(Collectors.toList()));
      });

      System.out.println(mglist);

      //方法二：获取分割后的集合
      List<List<Integer>> splitList = Stream.iterate(0, n -> n + 1).limit(limit).parallel().map(a -> list.stream().skip(a * MAX_NUMBER).limit(MAX_NUMBER).parallel().collect(Collectors.toList())).collect(Collectors.toList());

      System.out.println(splitList);
}
```

1. 使用google guava对List进行分割

```java
//使用guava对list进行分割
List<User> users = userService.findAll();
//按每50个一组分割
List<List<User>> parts = Lists.partition(users, 50);
parts.stream().forEach(list -> {
    process(list);
});
1234567
```

1. 使用apache common collection

```java
List<Integer> intList = Lists.newArrayList(1, 2, 3, 4, 5, 6, 7, 8);
List<List<Integer>> subs = ListUtils.partition(intList, 3);
12
```

1. java 手写将一个List等分成n个list

```java
public static <T> List<List<T>> averageAssign(List<T> source, int n) {
    List<List<T>> result = new ArrayList<>();
	//(先计算出余数)
    int remainder = source.size() % n;
    //然后是商
    int number = source.size() / n;
	//偏移量
    int offset = 0;
    for (int i = 0; i < n; i++) {
        List<T> value;
        if (remainder > 0) {
            value = source.subList(i * number + offset, (i + 1) * number + offset + 1);
            remainder--;
            offset++;
        } else {
            value = source.subList(i * number + offset, (i + 1) * number + offset);
        }
        result.add(value);
    }
    return result;
}

```

:::


# list 取差集 并集


💡 不要用这个了 hutool里有collUtil的工具类很好用



::: details 原commons-collections4方法


```xml
<dependency>
   <groupId>org.apache.commons</groupId>
   <artifactId>commons-collections4</artifactId>
   <version>4.4</version>
</dependency>
```

`import** org.apache.commons.collections4.CollectionUtils;`

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
