---
title: java8中Stream流的基本用法
author: VAYO
date: '2023-09-11'
categories:
  - java8 stream
tags:
  - stream
  - java8
# sidebar: 'auto'
---


# groupby

```java
Map<Long, List<TmallItemImgs>> collect1 =
 tmallItemImgs.stream().collect(Collectors.groupingBy(TmallItemImgs::getNumIid));
```

## 分组后求最大Collectors.groupingBy

```java
list.stream().collect(
                Collectors.groupingBy(
                        e -> substring(e),
                        Collectors.maxBy(Comparator.comparing(String::toString))
                    )
                )
                .forEach((k, v) -> {
                    System.out.println("K:" + k + "-V:" + v.get() );
                    }
                );
```

# 分组后做统计（最大，排序之类的）

```java
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
public class User implements Serializable {
    private static final long serialVersionUID = 1220193146286930256L;
    private String id;
    private String name;
    private String groupId;
    private int num;
    private int age;
    // get set...
   
    private static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

    public static void main(String[] args) {
        ArrayList<User> list = new ArrayList<>(10);
        list.add(new User("1", "1号", "A", 10, 10));
        list.add(new User("2", "2号", "A", 20, 10));
        list.add(new User("3", "3号", "E", 50, 12));
        list.add(new User("4", "4号", "B", 60, 20));
        list.add(new User("5", "5号", "C", 80, 40));
        list.add(new User("6", "6号", "B", 220, 20));
        list.add(new User("7", "7号", "A", 110, 2));
        list.add(new User("8", "8号", "D", 110, 68));
        //去重复获取组
        System.out.println("----------去重复获取组-------------------");
        list.stream().filter(distinctByKey(User::getGroupId)).map(User::getGroupId).forEach(s -> {
            System.out.println(s);
        });
        //从第2个开始(下标)
        System.out.println("-------------从第2个开始----------------");
        list.stream().skip(2).forEach(s -> {
            System.out.println(s);
        });
        //取10以内的
        System.out.println("-------------取10以内的----------------");
        list.stream().filter(user -> user.getAge() <= 10).forEach(s -> {
            System.out.println(s);
        });
        //取最大
        System.out.println("----------------取最大-------------");
        User user = list.stream().max(Comparator.comparing(User::getNum)).get();
        System.out.println(user);
        //分组求合
        System.out.println("---------------分组求合--------------");
        list.stream().collect(Collectors.groupingBy(User::getGroupId, Collectors.summingInt(User::getNum))).forEach((k, v) -> {
            System.out.println("K:" + k + "-V:" + v);
        });
        //分组取组内最大
        System.out.println("--------------分组取组内最大---------------");
        list.stream().collect(Collectors.groupingBy(User::getGroupId, Collectors.maxBy(Comparator.comparingInt(User::getNum)))).forEach((k, v) -> {
            System.out.println("K:" + k + "-V:" + v.get());
        });
        //分组取组内最小
        System.out.println("------------分组取组内最小-----------------");
        list.stream().collect(Collectors.groupingBy(User::getGroupId, Collectors.minBy(Comparator.comparingInt(User::getNum)))).forEach((k, v) -> {
            System.out.println("K:" + k + "-V:" + v.get());
        });
        //分组聚合多列
        System.out.println("---------------分组聚合多列计算--------------");
        list.stream().collect(Collectors.groupingBy(User::getGroupId, Collectors.collectingAndThen(Collectors.toList(), users -> {
            Double[] ints = new Double[2];
            Double asDouble1 = users.stream().mapToInt(User::getNum).average().getAsDouble();
            Double asDouble2 = users.stream().mapToInt(User::getAge).average().getAsDouble();
            ints[0] = asDouble1;
            ints[1] = asDouble2;
            return ints;
        }))).forEach((k, v) -> {
            System.out.println("K:" + k + "-V:" + v[0] + "," + v[1]);
        });
        //分组后组内排序
        System.out.println("---------------分组后组内排序--------------");
        list.stream().collect(Collectors.groupingBy(User::getGroupId, Collectors.collectingAndThen(Collectors.toList(), users -> {
            users.sort(Comparator.comparing(User::getNum).reversed());
            return users;
        }))).forEach((k, v) -> {
            System.out.println("k:" + k);
            System.out.println("v----->:");
            v.forEach(s -> {
                System.out.println(s);
            });
        });

    }

}
```

[java8stream做统计（分组后取最大最小，排序）_小小小果子的博客-CSDN博客_java8 stream 统计](https://blog.csdn.net/weixin_46244732/article/details/122498257)

# 先计算后分组并排序

```java
// 计算两个字段的相加值，并按值进行分组，并根据相加的值进行排序
        List<Map.Entry<Integer, List<Bean>>> sortedEntries = beanList.stream()
                .collect(Collectors.groupingBy(bean -> bean.getField1() + bean.getField2()))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toList());
```

```java
// 计算两个字段的相加值，并按值进行分组
        Map<Integer, List<Bean>> groupedMap = beanList.stream()
                .collect(Collectors.groupingBy(bean -> bean.getField1() + bean.getField2()));

        // 根据相加的值进行排序
        List<Map.Entry<Integer, List<Bean>>> sortedEntries = groupedMap.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toList());
```

倒序

```java

        // 计算两个字段的相加值，并按值进行分组，并根据相加的值进行排序
  List<Map.Entry<Double, List<VenderShopCategory>>> sortedEntries  = shopCategoriesOfData.stream().collect(Collectors.groupingBy(e ->
          StringUtils.similarAndContainsMutual(e.getName(), dto.getPublishName()).doubleValue()
      )).entrySet()
      .stream()
      **.sorted(Collections.reverseOrder(Map.Entry.comparingByKey()))**
      .collect(Collectors.toList());
```

# filter

## Predicate

```java
packagecom.imooc.ecommerce.service;

importlombok.extern.slf4j.Slf4j;
importorg.junit.Test;
importorg.junit.runner.RunWith;
importorg.springframework.boot.test.context.SpringBootTest;
importorg.springframework.test.context.junit4.SpringRunner;

importjava.util.Arrays;
importjava.util.List;
importjava.util.function.Predicate;

/**
 *<h1>Java8 Predicate使用方法与思想</h1>
 * */
@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public classPredicateTest {

public staticList<String> MICRO_SERVICE = Arrays.asList(
"nacos","authority","gateway","ribbon","feign","hystrix","e-commerce"
);

/**
     *<h2>test方法主要用于参数符不符合规则,返回值是boolean</h2>
     * */
@Test
public voidtestPredicateTest() {

        Predicate<String> letterLengthLimit = s -> s.length() > 5;
        MICRO_SERVICE.stream().filter(letterLengthLimit).forEach(System.out::println);
    }

/**
     *<h2>and方法等同于我们的逻辑与&&,存在短路特性,需要所有的条件都满足</h2>
     * */
@Test
public voidtestPredicateAnd() {

        Predicate<String> letterLengthLimit = s -> s.length() > 5;
        Predicate<String> letterStartWith = s -> s.startsWith("gate");

        MICRO_SERVICE.stream().filter(
                letterLengthLimit.and(letterStartWith)
        ).forEach(System.out::println);
    }

		/**
     *<h2>or等同于我们的逻辑或||,多个条件主要一个满足即可</h2>
     * */
@Test
public voidtestPredicateOr() {

        Predicate<String> letterLengthLimit = s -> s.length() > 5;
        Predicate<String> letterStartWith = s -> s.startsWith("gate");

        MICRO_SERVICE.stream().filter(
                letterLengthLimit.or(letterStartWith)
        ).forEach(System.out::println);
    }

/**
     *<h2>negate等同于我们的逻辑非!</h2>
     * */
@Test
public voidtestPredicateNegate() {

        Predicate<String> letterStartWith = s -> s.startsWith("gate");
        MICRO_SERVICE.stream().filter(letterStartWith.negate()).forEach(System.out::println);
    }

/**
     *<h2>isEqual类似于equals(),区别在于:先判断对象是否为NULL,
     *不为NULL再使用equals进行比较</h2>
     * */
@Test
public voidtestPredicateIsEqual() {

        Predicate<String> equalGateway = s -> Predicate.isEqual("gateway").test(s);
        MICRO_SERVICE.stream().filter(equalGateway).forEach(System.out::println);
    }
}

```

# BigDecimal 求和

```java
BigDecimal sum = midList.stream().map(ProductUserMid::getMoney)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
```

# map

*取出list里面的ID变成`List<Id>`*

```java
List<Long> userIds = List.stream().map(UserVo::getId).collect(Collectors.toList());
```

*//* key 重复

```java
Map<Long, ProTaobaoBookSkuEntity> existingMap = existingList.stream().collect(Collectors.toMap(ProTaobaoBookSkuEntity::getScpuId, a -> a, (k1, k2) -> k1));
```

// 根据 userid*分组*

```java
Map<Long, List<UserRoleVo>> userRoleMap = userRoleVos.stream().collect(Collectors.groupingBy(UserRoleVo::getUserId, Collectors.toList()));
```

value为空的情况

```java
Map<String, String> collect = attrByProId.stream()
                    .collect(HashMap::new, (m, v) -> m.put(v.getAttrId(), v.getAttrParamValue()), HashMap::putAll
                    );
```

# joining

```java
String collect = dtoList.stream().map(r -> **""**+r.getInvoiceNo()+**""**).collect(Collectors.joining(**","**));
```

# stord

## 倒叙

```java
List<DistPlatformPddCat> collect = distPlatformPddCats.stream()
.sorted(Comparator.comparing(DistPlatformPddCat::getSimilar).reversed()).collect(Collectors.toList());
```

或者

Comparator.reverseOrder()

```java
VO.getBookInfoFileObjList().
                stream()
.sorted(Comparator.comparing(BookInfoFileVo::getUpdateTime,Comparator.reverseOrder())).collect(Collectors.toList());
```

# flatmap 扁平化处理

其实就是对dto里面的prop为list的 进

行扁平化处理

![Untitled](Stream%E6%B5%81-java8d2beba51c98542599aa364c74553dfc1/Untitled2.png)

![Untitled](Stream%E6%B5%81-java8d2beba51c98542599aa364c74553dfc1/Untitled3.png)

# noneMatch

`noneMatch`是Java 8中Stream API中的一个终止操作（Terminal Operation）。它接受一个Predicate函数式接口作为参数，并返回一个布尔值。它用于检查流中的所有元素是否都不满足给定的条件。

如果流中没有任何元素满足条件，即所有元素都不匹配，则`noneMatch`返回`true`。否则，返回`false`。

# 用Java 8的语法找出所有最下级对象

// 如果我的id没有匹配到别人的pid，那么我就是最下级的

```java
list.stream()
		.filter(obj -> list.stream()
    .noneMatch(otherObj -> ObjUtil.equals(otherObj.getParentCid() ,obj.getCid() )  )) //如果我的id没有匹配到别人的pid，那么我就是最下级的
    .map(VenderShopCategory::getCid).collect(Collectors.toSet())
```

# stream.peak

![Untitled](Stream%E6%B5%81-java8d2beba51c98542599aa364c74553dfc1/Untitled.png)

