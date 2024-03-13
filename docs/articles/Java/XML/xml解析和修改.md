# 问题背景：
淘宝发布产品 complex里面的方法是setComplexValue,并不实际ComplexValues，那为啥参数是complexValues呢？
小二回复：淘宝发布产品的complex还是老协议，需要使用<complex-values>
所以要找到xml里面的标签并且替换里面你的名字


## 解决代码
主要是用了org.dom4j.Document
```Java
    StringReader sr = new StringReader(XmlUtils.escapeXml(ret));
    InputSource source = new InputSource(sr);
    Document doc = XmlUtils.getDocument(source);
    List<Node> nodes = doc.selectNodes("//*[@id=\"product_images\"]/complex-value");
    for (Node node : nodes) {
        node.setName("complex-values");
    }
    String modified = doc.asXML();
```

java解析xpath的依赖
```XML
<dependency>
    <groupId>jaxen</groupId>
    <artifactId>jaxen</artifactId>
    <version>1.2.0</version>
</dependency>

```
