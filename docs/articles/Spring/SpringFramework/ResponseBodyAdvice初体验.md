---
title: 当同事写了个impl..ResponseBodyAdvice
author: VAYO
date: '2023-09-12'
categories:
  - spring ResponseBodyAdvice
tags:
  - spring
  - ResponseBodyAdvice
  
outline: {
  level: [2, 6],
  label: '目录'
}
---

# ResponseBodyAdvice

因为有一个外部api调用本地程序的情况，需要记录每次调用的具体细节到日志里面，所以我写了个AOP实现该需求，但是同事在知道我写过这个AOP的情况下又写了个`ResponseBodyAdvice`， 因为之前没有了解过`ResponseBodyAdvice` ，所以搜索了一下

花了两个小时时间测试了一下，和我写的AOP不兼容，而且他在`beforeBodyWrite`里他做了鉴权，这里明显是不合理的。

## ResponseBodyAdvice里面有supports，beforeBodyWrite，aop里面是 @Around 这个情况下的执行顺序是？

在Spring Boot中，当一个请求到达一个带有AOP和ResponseBodyAdvice的方法时，执行顺序如下：

1. `AOP Around Advice (@Around)`：首先，`AOP Around Advice`会在方法执行之前进行拦截。在`Around Advice`中，您可以执行额外的逻辑，例如日志记录、权限检查等。然后，您可以选择继续执行目标方法，也可以在此处返回结果，并在之后继续执行后续的Advice。
2. 方法执行：接下来，如果`AOP Around Advice`选择继续执行目标方法，那么目标方法本身会被执行。这是您编写的实际业务逻辑的地方。
3. `ResponseBodyAdvice supports`：在方法执行完成后，Spring会检查是否存在`ResponseBodyAdvice`，并调用其中的`supports`方法。supports方法用于确定是否应该应用该`ResponseBodyAdvice`。如果supports方法返回true，则继续执行后续的Advice；如果返回false，则跳过后续Advice并将方法返回结果直接返回给客户端。
4. `ResponseBodyAdvice beforeBodyWrite`：如果`ResponseBodyAdvice`的`supports`方法返回true，那么Spring会调用其中的`beforeBodyWrite`方法。在`beforeBodyWrite`方法中，您可以修改响应的内容，例如添加通用的响应头、对响应结果进行封装等。最后，将修改后的响应发送给客户端。

总结起来，执行顺序是`AOP(@Around)` -> `方法执行` ->` AOP(@Around) ` ->  `ResponseBodyAdvice supports` -> `ResponseBodyAdvice beforeBodyWrite`。

## 实现ResponseBodyAdvice的方法加@ControllerAdvice("com.xxx.xxx")是什么意思

在Spring Boot中，通过使用`@ControllerAdvice`注解并指定目标包路径，可以创建一个全局的控制器增强器`（Controller Advice）`。这个控制器增强器将应用于指定包路径下的所有控制器（Controller）。

具体来说，当您在一个类上使用`@ControllerAdvice`注解，并指定一个包路径作为参数，比如`@ControllerAdvice("com.xxx.xxx")`，这意味着该类将作为一个控制器增强器，仅应用于`com.xxx.xxx`包路径下的所有控制器。

控制器增强器可以用于处理全局的异常、添加全局的数据绑定、应用全局的拦截器等。通过指定包路径，您可以将控制器增强器的作用范围限定在特定的包路径下，以便只对该包路径下的控制器生效。

在您的例子中，控制器增强器将应用于`com.xxx.xxx`包路径下的所有控制器，使您可以在该范围内实现`ResponseBodyAdvice`的方法，并对响应结果进行统一处理或修改。

## @ControllerAdvice和@RestControllerAdvice区别

`@ControllerAdvice`和`@RestControllerAdvice`是Spring Boot中用于创建控制器增强器（Controller Advice）的注解。它们的区别在于适用的控制器类型。

1. `@ControllerAdvice`：`@ControllerAdvice`注解用于创建通用的控制器增强器，适用于传统的基于Spring MVC的控制器（Controller）。这种控制器可以使用多种注解进行标识，如@Controller、@RequestMapping等。

2. `@RestControllerAdvice`：`@RestControllerAdvice`注解是Spring Boot提供的特殊版本的`@ControllerAdvice`注解，用于创建控制器增强器，适用于使用@RestController注解的RESTful风格的控制器。@RestController注解结合了@Controller和@ResponseBody注解，用于表示控制器返回的是RESTful风格的响应数据。

因此，区别在于@ControllerAdvice适用于传统的控制器，而@RestControllerAdvice适用于RESTful风格的控制器。

无论使用`@ControllerAdvice`还是`@RestControllerAdvice`，您都可以在增强器中实现各种方法，如处理全局异常、添加全局数据绑定、应用全局拦截器等。这些增强器可以对指定范围内的控制器进行统一的处理和修改。

## ResponseBodyAdvice 和HandlerInterceptor区别

`ResponseBodyAdvice` 和 `HandlerInterceptor` 是 Spring MVC 中用于处理请求和响应的两个不同的接口，它们的作用和使用方式有所不同。

1. `ResponseBodyAdvice`：`ResponseBodyAdvice` 是一个接口，用于对响应体进行处理和增强。它可以在请求处理后，返回响应给客户端之前，对响应体进行修改或添加额外的信息。通过实现 `ResponseBodyAdvice` 接口，可以自定义全局性的响应体处理逻辑，例如添加统一的响应头、对响应数据进行加密或压缩等。`ResponseBodyAdvice` 的方法包括 `supports()` 和 `beforeBodyWrite()`，其中 `supports()` 用于判断是否支持当前请求的响应体类型，而 `beforeBodyWrite()` 则用于对响应体进行处理。

2. `HandlerInterceptor`：`HandlerInterceptor` 是一个接口，用于拦截请求的处理过程。它可以在请求被处理前、处理后以及视图渲染完成后执行相应的方法。通过实现 `HandlerInterceptor` 接口，可以对请求进行拦截和处理，例如进行权限验证、日志记录、性能监控等。`HandlerInterceptor` 的方法包括 `preHandle()`、`postHandle()` 和 `afterCompletion()`，分别对应请求处理前、处理后和视图渲染完成后的处理。

总结区别：
- `ResponseBodyAdvice` 主要用于对响应体进行处理和增强，可以修改响应数据、添加额外信息等，是对响应体的全局性处理。
- `HandlerInterceptor` 主要用于拦截请求的处理过程，可以进行权限验证、日志记录、性能监控等，是对请求处理过程的拦截和处理。

两者的使用场景和目的不同，`ResponseBodyAdvice` 更关注对响应体的处理，而 `HandlerInterceptor` 更关注对请求处理过程的拦截和处理。通常情况下，你可以根据具体的需求选择使用其中的一个或两者结合来完成相应的功能。

## 有HandlerInterceptor 又有ResponseBodyAdvice 还有aop@Around 执行顺序
当一个方法同时存在 `HandlerInterceptor`、`ResponseBodyAdvice` 和 `@Around` 注解时，它们的执行顺序如下：

1. 拦截器的 `preHandle` 方法：在方法执行前执行拦截器的 `preHandle` 方法。

2. AOP 的 `@Around` 注解（方法执行前）：AOP 的 `@Around` 注解会将目标方法封装在一个代理对象中，可以在方法执行前后进行额外的处理。在执行方法前，AOP 的 `@Around` 注解的逻辑会被执行。

3. 方法执行：实际的方法逻辑会被执行。

4. AOP 的 `@Around` 注解（方法执行后）：在方法执行后，AOP 的 `@Around` 注解的逻辑会被执行。

5. 拦截器的 `postHandle` 方法：在方法执行后，拦截器的 `postHandle` 方法会被执行。

6. `ResponseBodyAdvice` 的 `supports()` 方法：`ResponseBodyAdvice` 的 `supports()` 方法会被调用，用于判断是否支持当前请求的响应体类型。

7. `ResponseBodyAdvice` 的 `beforeBodyWrite()` 方法：如果 `supports()` 方法返回 `true`，则 `ResponseBodyAdvice` 的 `beforeBodyWrite()` 方法会被执行，用于对响应体进行处理。

8. 拦截器的 `afterCompletion` 方法：在视图渲染完成后，拦截器的 `afterCompletion` 方法会被执行。

综上所述，执行顺序是：拦截器的 `preHandle` 方法 -> AOP 的 `@Around` 注解（方法执行前）-> 方法执行 -> AOP 的 `@Around` 注解（方法执行后）-> 拦截器的 `postHandle` 方法 -> `ResponseBodyAdvice` 的 `supports()` 方法 -> `ResponseBodyAdvice` 的 `beforeBodyWrite()` 方法 -> 拦截器的 `afterCompletion` 方法。
