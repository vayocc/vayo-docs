# 测试子方法中重新赋值list 父方法结果会不会是否一致

```Java
@Test
    public void testList() {
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        // list.addAll(List.of("3", "4", "5", "6"));
        System.out.println(list + "------1----" + Integer.toHexString(System.identityHashCode(list)));
        extracted(list);
        System.out.println(list + "------4----" + Integer.toHexString(System.identityHashCode(list)));
    }

    private void extracted(List<String> list) {
        System.out.println(list + "------2----" + Integer.toHexString(System.identityHashCode(list)));
        if (list.size() > 5 ) {
            list = list.stream().limit(5).collect(Collectors.toList());
        } else if (list.size() < 5) {
            List<String> newList = new ArrayList<>(list);
            while (newList.size() < 5) {
                newList.addAll(list);
            }
            list = newList.stream().limit(5).collect(Collectors.toList());
        }
        System.out.println(list + "------3----" + Integer.toHexString(System.identityHashCode(list)));
    }
```
list = list 和list = newList  对list重新赋值了，所以引用地址也变了 
```Java
[1, 2]------1----2c34f934
[1, 2]------2----2c34f934
[1, 2, 1, 2, 1]------3----17c1bced
[1, 2]------4----2c34f934
```

## 解决
### 方法1：return 一下
只能解决值，不能解决引用地址
```java
 @Test
    public void testList() {
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        list.addAll(List.of("3", "4", "5", "6"));
        System.out.println(list + "------1----" + Integer.toHexString(System.identityHashCode(list)));
        list = extracted(list);
        System.out.println(list + "------4----" + Integer.toHexString(System.identityHashCode(list)));
    }

    private List<String> extracted(List<String> list) {
        System.out.println(list + "------2----" + Integer.toHexString(System.identityHashCode(list)));
        if (list.size() > 5 ) {
            list = list.stream().limit(5).collect(Collectors.toList());
        } else if (list.size() < 5) {
            List<String> newList = new ArrayList<>(list);
            while (newList.size() < 5) {
                newList.addAll(list);
            }
            list = newList.stream().limit(5).collect(Collectors.toList());
        }
        System.out.println(list + "------3----" + Integer.toHexString(System.identityHashCode(list)));
        return list;
    }
```

### 方法2：更改原list
```Java
@Test
    public void testList() {
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        // list.addAll(List.of("3", "4", "5", "6"));
        System.out.println(list + "------1----" + Integer.toHexString(System.identityHashCode(list)));
        extracted(list);
        System.out.println(list + "------4----" + Integer.toHexString(System.identityHashCode(list)));
    }

    private void extracted(List<String> list) {
        System.out.println(list + "------2----" + Integer.toHexString(System.identityHashCode(list)));
        if (list.size() > 5 ) {
            // list = list.stream().limit(5).collect(Collectors.toList());
            list.subList(5, list.size()).clear();
        } else if (list.size() < 5) {
            List<String> newList = new ArrayList<>(list);
            while (newList.size() < 5) {
                newList.addAll(list);
            }
            // list = newList.stream().limit(5).collect(Collectors.toList());
            list.clear();
            list.addAll(newList.subList(0, 5));
        }
        System.out.println(list + "------3----" + Integer.toHexString(System.identityHashCode(list)));
    }
```
