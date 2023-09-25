# 必会：SpringBoot Actuator

**Actuator 就是为了监控项目的健康程度**

# 三板斧

1. 依赖 
2. 注解
3. 配置

# **配置Actuator**

## 1.依赖

```xml
				<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

![SpringBoot-Actuator/11f44d2d-85db-4519-a88e-559269e7349f.png](SpringBoot-Actuator/11f44d2d-85db-4519-a88e-559269e7349f.png)

之后会多出这一行

![SpringBoot-Actuator/60ac5cbd-0c5c-4108-bb2e-4fcfc0ca7255.png](SpringBoot-Actuator/60ac5cbd-0c5c-4108-bb2e-4fcfc0ca7255.png)

访问

![SpringBoot-Actuator/c188dddf-4b35-40b3-8683-a70ce860350b.png](SpringBoot-Actuator/c188dddf-4b35-40b3-8683-a70ce860350b.png)

## 3配置（细粒度的配置需要加yml）

```yaml
management:
  endpoints:
    web:
      exposure:
        include: '*'
```

---

```yaml
# 暴露端点
management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      show-details: always
```

---

# 

# 监控端点

![SpringBoot-Actuator/06194ca3-992d-4e79-b595-2503fefa71cd.png](SpringBoot-Actuator/06194ca3-992d-4e79-b595-2503fefa71cd.png)

## health 端点

![SpringBoot-Actuator/6d79780c-ae8b-432f-aa9f-171f3fd4d236.png](SpringBoot-Actuator/6d79780c-ae8b-432f-aa9f-171f3fd4d236.png)

health端点的详情

![SpringBoot-Actuator/b485b179-c2c3-42f7-a7e8-2bdb20ac34bc.png](SpringBoot-Actuator/b485b179-c2c3-42f7-a7e8-2bdb20ac34bc.png)

之后就变成了这种

![SpringBoot-Actuator/eb0034e2-b1d3-4b0a-baf8-57b7c66d8417.png](SpringBoot-Actuator/eb0034e2-b1d3-4b0a-baf8-57b7c66d8417.png)

---

## info端点（描述端点）

![SpringBoot-Actuator/87e98eb7-3dbc-44e3-823d-b9f13c79a4ca.png](SpringBoot-Actuator/87e98eb7-3dbc-44e3-823d-b9f13c79a4ca.png)

![SpringBoot-Actuator/0d193d1f-17ef-42d4-afcd-33bdacf1aa9f.png](SpringBoot-Actuator/0d193d1f-17ef-42d4-afcd-33bdacf1aa9f.png)

## 激活所有的actuator端点

![SpringBoot-Actuator/2fc348df-4ee4-4f13-a578-d32bd27375c9.png](SpringBoot-Actuator/2fc348df-4ee4-4f13-a578-d32bd27375c9.png)

![SpringBoot-Actuator/a967298f-c30d-4477-a3a4-4f75be1a98ff.png](SpringBoot-Actuator/a967298f-c30d-4477-a3a4-4f75be1a98ff.png)

### 举例

### 看配置

![SpringBoot-Actuator/8aea3a55-8e3d-498a-a589-942f08c1f2d2.png](SpringBoot-Actuator/8aea3a55-8e3d-498a-a589-942f08c1f2d2.png)

### 看JVM线程状态

![SpringBoot-Actuator/0dc073a3-4986-4dc4-b599-14f5598ff83a.png](SpringBoot-Actuator/0dc073a3-4986-4dc4-b599-14f5598ff83a.png)

## 只激活 一部分actuator 端点

![SpringBoot-Actuator/ddbcc61d-95c4-481c-933a-8824d1d48692.png](SpringBoot-Actuator/ddbcc61d-95c4-481c-933a-8824d1d48692.png)

![SpringBoot-Actuator/a6d0da05-fe22-4dee-8b3d-6ec0c8156930.png](SpringBoot-Actuator/a6d0da05-fe22-4dee-8b3d-6ec0c8156930.png)
