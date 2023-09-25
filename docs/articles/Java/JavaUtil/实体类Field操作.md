# 实体类`Field`操作

hutools的

# 获取所有Field

```java
Field[] fields = ReflectUtil.getFields(BookInfoExcelVo.class);
```

# set字段

```java
ReflectUtil.setFieldValue(dto,field,value );
```

# 例子
```java
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.ReflectUtil;
import com.alibaba.excel.annotation.ExcelProperty;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;

import java.util.LinkedHashMap;

/**
 * @author IT1N0
 * @Description:
 * @date 2023/2/21 13:32
 */
public class BookInfoUtils {

    public static List<BookInfoExcelVo> toBookInfo(List<LinkedHashMap<String, Object>> objectList) {
        List<BookInfoExcelVo> retList = new ArrayList<>();

        BookInfoExcelVo dto = new BookInfoExcelVo();
//        Map<String, PropertyDescriptor> propertyDescriptorMap = BeanUtil.getPropertyDescriptorMap(BookInfoExcelVo.class,true);
//        PropertyDescriptor[] propertyDescriptors = BeanUtil.getPropertyDescriptors(BookInfoExcelVo.class);
//        BeanDesc beanDesc = BeanUtil.getBeanDesc(BookInfoExcelVo.class);
        Field[] fields = ReflectUtil.getFields(BookInfoExcelVo.class);
        // List<Field> fieldsListWithAnnotation = FieldUtils.getFieldsListWithAnnotation(BookInfoExcelVo.class, ExcelProperty.class);
        for (LinkedHashMap<String, Object> o : objectList) {

            for (Map.Entry<String, Object> stringStringEntry : o.entrySet()) {
                Object value = stringStringEntry.getValue();
                if (ObjectUtil.isNotEmpty(value)) {
                    String each = String.valueOf(value);
                    fieldFor:
                    for (Field field : fields) {
                        String regex = ":|：";
                        String[] split = StringUtils.split(each, regex, 2);
                        if (ObjectUtil.isNotEmpty(split)) {
                            boolean contains = false;
                            String[] eqStrArr = {"作者简介", "作者", "书名", "丛书名"};
                            boolean bo = ArrayUtil.contains(eqStrArr, field.getAnnotation(ExcelProperty.class).value()[0]); // 这个方法里面有equals
                            if (bo) {
                                contains = StringUtils.equals(StringUtils.extractChinese(split[0]), field.getAnnotation(ExcelProperty.class).value()[0]);
                            } else {
                                contains = StringUtils.contains(split[0], field.getAnnotation(ExcelProperty.class).value()[0]);
                            }
                            if (contains) {
                                try {
                                    ReflectUtil.setFieldValue(dto, field, split[1]);
                                } catch (Exception e) {
                                }
                                break fieldFor;
                            }
                        }
                    }
                }
            }
        }
        retList.add(dto);
        return retList;
    }


    private static void extracted(BookInfoExcelVo dto, String text, String field, String common) {
        String regex = ":|：";
        String[] split = StringUtils.split(text, regex, 2);
        if (ObjectUtil.isNotEmpty(split)) {
            if (StringUtils.contains(split[0], common)) {
                BeanUtil.setFieldValue(dto, field, split[1]);
                PropertyDescriptor propertyDescriptor = BeanUtil.getPropertyDescriptor(BookInfoExcelVo.class, field);
                System.out.println(propertyDescriptor);
            }
        }
    }
}
```
