
# @RequiredArgsConstructor bean context form a cycle 问题

```java
@NoArgsConstructor //  生成无参的构造方法，
@AllArgsConstructor // 生成一个包含过所有字段的构造方法。
@RequiredArgsConstructor // 会将类的每一个final字段或者non-null字段生成一个构造方法 ，

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired)) //jdk 7
@RequiredArgsConstructor(onConstructor_ = {@Lazy, @Autowired}) //jdk8 

private final ShareMapper shareMapper;

```

[@RequiredArgsConstructor(onConstructor = @__(@Autowired)) Intellij IDEA如何去掉@Autowired 注入警告的方法 - 程序员大本营](https://www.pianshen.com/article/59551951850/)

[Lombok @RequiredArgsConstructor examples](https://javabydeveloper.com/lombok-requiredargsconstructor-examples/)

[](https://www.baeldung.com/circular-dependencies-in-spring)

[Spring boot The dependencies of some of the beans in the application context form a cycle:](https://stackoverflow.com/questions/66990568/spring-boot-the-dependencies-of-some-of-the-beans-in-the-application-context-for)

[痛快！SpringBoot终于禁掉了循环依赖！-51CTO.COM](https://www.51cto.com/article/708841.html)
