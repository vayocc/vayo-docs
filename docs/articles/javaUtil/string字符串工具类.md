# string字符串工具类

# `StringUtils.*containsAny`(str,str…)双向奔赴*

**`package** org.apache.commons.lang3;`

判断某字符串被数组存在过

![Untitled](/images/string字符串工具类/Untitled.png)

<aside>
💡 关键源码

</aside>

![Untitled](/images/string字符串工具类/Untitled%201.png)

![Untitled](/images/string字符串工具类/Untitled%202.png)

# *`清除转义字符`*

```java
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-text -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-text</artifactId>
    <version>1.10.0</version>
</dependency>
```

```java
		/**
     * 清除转义字符
     * @param str
     * @return
     */
    public static String cleanBlankUnescapeJava(String str) {
        String s = org.apache.commons.text.StringEscapeUtils.unescapeJava(str);
        return StrUtil.cleanBlank(s);

    }
```

# *`截取指定字符串中间部分，不包括标识字符串`*subBetween

```java
String coide = "invalid scItemCodes [T000027314, T001007134], traceId=212c8fff16748934599257054e12f1";
List<String> split = StrUtil.split(StrUtil.subBetween(coide, "[", "]"), ",",true,true); 
```

# *`提取字符串中的数字`*

方法1

```java
/**
 *提取字符串中的数字
*@paraminput
*@return
*/
public staticString extractNum(String input) {
if (StrUtil.isBlank(input)) {
            return "";
        }

        String s = input.replaceAll("\\s*", "").replaceAll("[^(0-9)]", "");
        return s;

}
```

方法2. form chatmoss

```java
@Test
    public void extractDigits() {
       String  str = "12987xx439---87asd981";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (Character.isDigit(c)) {
                sb.append(c);
            }
        }
        System.out.println(sb.toString());
    }
```

# *`提取中文`*

里面都是hutools的

```jsx
public static String extractChinese(String input) {
        return  StrUtil.join("",ReUtil.findAllGroup0(ReUtil.RE_CHINESE, input));
    }
```

方法2. form bing ai

```java
@Test
    public void extractChinese() {
        String str = "Hello, 你好, こんにちは, 안녕하세요, Bonjour, Здравствуйте，123123。asdf";
        Pattern pattern = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher matcher = pattern.matcher(str);
        StringBuilder sb = new StringBuilder();
        while (matcher.find()) {
            sb.append(matcher.group());
        }
        String chinese = sb.toString();
        System.out.println(chinese);
    }
```

方法3. form chatmoss 

```java
@Test
    public void extractChinese2() {
        String str = "Hello, 你好, こんにちは, 안녕하세요, Bonjour, Здравствуйте，123123。asdf";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (isChinese(c)) {
                sb.append(c);
            }
        }
        String chinese = sb.toString();
        System.out.println(chinese);
    }

    private static boolean isChinese(char c) {
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
        return ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
            || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
            || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A;
    }
```

# 是否包含数字

1. 利用Java 8中的Stream API和Character.isDigit()方法来判断：

```java
String str = "Hello123World";
boolean containsDigit = str.chars().anyMatch(Character::isDigit);

if (containsDigit) {
    System.out.println("包含数字");
} else {
    System.out.println("不包含数字");
}
```

# 取价格

hutools的工具

```java
String price1 = "99.99";
        String price2 = "99.9";
        String price3 = "99.99元";
        String price4 = "99.99.99";

        BigDecimal decimal1 = PriceUtils .parsePrice(price1);
        BigDecimal decimal2 = PriceUtils .parsePrice(price2);
        BigDecimal decimal3 = PriceUtils .parsePrice(price3);
        BigDecimal decimal4 = PriceUtils .parsePrice(price4);

        System.out.println(decimal1); // 输出: 99.99
        System.out.println(decimal2); // 输出: 99.9
        System.out.println(decimal3); // 输出: 99.99
        System.out.println(decimal4); // 输出: 99.99
```

```java
public class PriceUtils {

    public static BigDecimal parsePrice(String numberStr) {
        if (StrUtil.isBlank(numberStr)) {
            return null;
        }
        return  numberStr.chars().anyMatch(Character::isDigit) ? NumberUtil.toBigDecimal(numberStr) : null ;
    }
}
```