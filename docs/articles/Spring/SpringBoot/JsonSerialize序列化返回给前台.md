---
outline: {
    level: [2, 6],
    label: '目录'
}
---

# JsonSerialize序列化返回给前台

## 定制序列化（每个url加前缀）

```java
@RequiredArgsConstructor(onConstructor_ = {@Autowired}) //@Lazy,
public class UrlJsonSerialize extends JsonSerializer<String> {

    private final AwsS3Properties s3Properties;

    @Override
    public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        String s = "";
        if (StrUtil.isNotBlank(value)) {
            s = s3Properties.getS3Url() + value;
        }
        gen.writeString(s);

    }
}
```

使用

```java
private String webUrl;

@JsonSerialize(using = UrlJsonSerialize.class)
publicString getWebUrl() {
	returns3FullPath;
}
```

## 更灵活的序列化，根据字典数据动态返回

```java
/**
 * 字典数据映射注解
 *
 * @author itino
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
@JacksonAnnotationsInside
@JsonSerialize(using = DictDataJsonSerializer.class)
public @interface DictDataMapper {

    /**
     *  字典类型：如 sys_user_sex
     * @return
     */
    String dictType() default "";
}
```

```java


import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.ContextualSerializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;

import java.io.IOException;
import java.util.Objects;

/**
 * 字典数据json序列化工具
 *
 * @author itino
 */
@Slf4j
public class DictDataJsonSerializer extends JsonSerializer<String> implements ContextualSerializer {

    private String dictType;

    @Override
    public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        try {
            DictService dictService = SpringUtils.getBean(DictService.class);
            if (ObjectUtil.isNotNull(dictService)) {
                String label = dictService.getDictLabel(dictType, value);
                gen.writeString(StrUtil.isNotBlank(label) ? label : value);
            } else {
                gen.writeString(value);
            }
        } catch (BeansException e) {
            log.error("字典数据未查到, 采用默认处理 => {}", e.getMessage());
            gen.writeString(value);
        }
    }

    @Override
    public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property) throws JsonMappingException {
        DictDataMapper anno = property.getAnnotation(DictDataMapper.class);
        if (Objects.nonNull(anno) && StrUtil.isNotBlank(anno.dictType())) {
            this.dictType = anno.dictType();
            return this;
        }
        return prov.findValueSerializer(property.getType(), property);
    }
}
```
