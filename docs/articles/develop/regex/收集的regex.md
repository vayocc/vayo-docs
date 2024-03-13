
# 正则捕获组
```text
在正则表达式中，括号 ( ) 用于创建一个捕获组。每个括号内的表达式都会成为一个独立的捕获组。

捕获组的作用是在匹配过程中提取或分组匹配的部分。通过使用 matcher.group(n) 方法，其中 n 是捕获组的索引，可以获取匹配的文本。

例如，在正则表达式 (\\d{4})[年.]?(\\d{1,2})[月.]? 中，有两个捕获组：

(\\d{4}) 是第一个捕获组，用于匹配四个数字的年份。
(\\d{1,2}) 是第二个捕获组，用于匹配一到两个数字的月份。
当使用 matcher.find() 方法找到匹配的子序列后，可以使用 matcher.group(1) 获取第一个捕获组的值（年份），使用 matcher.group(2) 获取第二个捕获组的值（月份）。

捕获组在正则表达式中非常有用，可以用于提取和处理匹配的部分，或者对匹配的部分进行分组操作。
```

# 正则日期格式化
```Java
    public static void main(String[] args) {
        String dateString2 = "2023年7";
        String dateString1 = "2023.7月";
        String dateString = "2023年7月";
        String dateString3 = "2023年7.";

        String regex = "(\\d{4})[年.]?(\\d{1,2})[月.]?";
        Pattern pattern = Pattern.compile(regex);

        String formattedDate2 = formatDate(dateString2, pattern);
        String formattedDate1 = formatDate(dateString1, pattern);
        String formattedDate = formatDate(dateString, pattern);
        String formattedDate3 = formatDate(dateString3, pattern);

        System.out.println(formattedDate2);
        System.out.println(formattedDate1);
        System.out.println(formattedDate);
        System.out.println(formattedDate3);
    }

    private static String formatDate(String dateString, Pattern pattern) {
        Matcher matcher = pattern.matcher(dateString);
        if (matcher.find()) {
            String year = matcher.group(1);
            String month = matcher.group(2);
            return year + "-" + month;
        }
        return dateString;
    }
```
结果
```text
2023-7
2023-7
2023-7
2023-7
```

# 提取字符串中的固定字段的值(key1=val1,key2=val2)取val
```Java
        String string = "BookIMG2PlatformDTO(serialNo=1724306004619374594, localFileIds=[961], shopId=1646798525287153665, actions=[主图列表, 商品详情], platformItemId=123456789)";

        // 提取serialNo的值
        Pattern serialNoPattern = Pattern.compile("serialNo=(.*?)(?:,|\\))"); // "(.*?)" 匹配任意字符（除换行符外）的任意次数，尽可能少地匹配。 // "(?:,|\))" 匹配逗号或右括号。
        Matcher serialNoMatcher = serialNoPattern.matcher(string);
        String serialNo = serialNoMatcher.find() ? serialNoMatcher.group(1) : null;
        // 提取platformItemId的值
        Pattern platformItemIdPattern = Pattern.compile("platformItemId=(.*?)(?:,|\\))");// "(.*?)" 匹配任意字符（除换行符外）的任意次数，尽可能少地匹配。 // "(?:,|\))" 匹配逗号或右括号。
        Matcher platformItemIdMatcher = platformItemIdPattern.matcher(string);
        String platformItemId = platformItemIdMatcher.find() ? platformItemIdMatcher.group(1) : null;

        System.out.println("serialNo: " + serialNo);
        System.out.println("platformItemId: " + platformItemId);


        // 提取serialNo和platformItemId的值
        Pattern pattern = Pattern.compile("(serialNo|platformItemId)=(.*?)(?:,|\\))");// "(.*?)" 匹配任意字符（除换行符外）的任意次数，尽可能少地匹配。 // "(?:,|\))" 匹配逗号或右括号。
        Matcher matcher = pattern.matcher(string);

        while (matcher.find()) {
            String key = matcher.group(1);
            String value = matcher.group(2);
            System.out.println(key + ": " + value);
        }
             
```
```text
serialNo: 17243060
platformItemId: 123456789
serialNo: 17243060
platformItemId: 123456789
```


# 取中括号里面字符串 （商详包含敏感词`['最大']`）`(.*?)`
要找到方括号`[]`中的字符串，可以使用正则表达式来匹配并提取其中的内容。在Java中，可以使用`Pattern`和`Matcher`类来实现。下面是一个示例代码：

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

String str = "com.jd.bk.saf.exception.SafJosException:参数错误.商详包含敏感词['最大']!#3c45d8b657f944f8adf60b70c8d71ea8(Solution reference: https://jos.jd.com/commondoc?listId=171)";

Pattern pattern = Pattern.compile("\\['(.*?)'\\]");
Matcher matcher = pattern.matcher(str);

while (matcher.find()) {
    String match = matcher.group(1);
    System.out.println("找到了方括号中的字符串：" + match);
    
    String match0 = matcher.group(0);
    System.out.println("找到了方括号中的字符串>>" + match0);
}
System.out.println("ReUtil.getGroup0找到了方括号中的字符串>>" +  ReUtil.getGroup0("\\['(.*?)'\\]",str));
System.out.println("ReUtil.getGroup1找到了方括号中的字符串>>" +  ReUtil.getGroup1("\\['(.*?)'\\]",str));
```

在上述代码中，我们使用正则表达式`\\['(.*?)'\\]`来匹配方括号`[]`中的字符串。解释一下正则表达式的含义：

- `\\[`：匹配方括号的起始字符`[`
- `'`：匹配单引号字符
- `(.*?)`：使用非贪婪模式匹配任意字符，`.*?`表示零个或多个任意字符
- `'`：匹配单引号字符
- `\\]`：匹配方括号的结束字符`]`

在`Matcher`对象上使用`find()`方法进行匹配，并在循环中使用`group(1)`方法获取匹配到的内容（即方括号中的字符串）。循环会继续查找并输出所有匹配到的字符串。

在上述示例中，方括号中的字符串是"最大"。你可以根据需要修改正则表达式来匹配不同的方括号内的内容。

# 取数量
```java
    // 来自阿里淘宝接口
    @Test
    public void test3e(){
        String regex = "([1-9][0-9]+|[0-9])";
        String value = "300010000.01yuan";
        String s = ReUtil.getGroup0( regex ,value);
        System.out.println(s);
    }
```

# 价格
```java 
value="([0-9]{0,9})(\.[0-9]{0,2})?"
```


