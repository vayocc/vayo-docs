**1 ) 实现 Cloneable 接口 ；**

**2 ) 重新定义 clone 方法 ， 并指定 public 访问修饰符 。**

问题 创建新的list 复制 并修改会 修改掉原数据

最后使用ObjectUtil.cloneByStream(); 解决  （深copy）
```java{6}
//if(attrSalesDto.getColorOn()){
// List<JingdongAttrSkuDetailSaleVo> newList =  Lists.newArrayList(attrSalesDto.getAttrValueList());
// newList.addAll(attrSalesDto.getAttrValueList()) //b不行
// List<JingdongAttrSkuDetailSaleVo> clone =  ObjectUtil.clone(attrSalesDto.getAttrValueList()); 不行
// attrSalesDto.setAttrValueCustomList(attrSalesDto.getAttrValueList()); // 不行
List<JingdongAttrSkuDetailSaleVo> jingdongAttrSkuDetailSaleVos = ObjectUtil.cloneByStream(attrSalesDto.getAttrValueList());

```


参考： http://www.javashuo.com/article/p-anrdxkdg-ns.html

对象 深copy https://blog.csdn.net/weixin_46096297/article/details/116241747

https://blog.csdn.net/weixin_52728674/article/details/124173060
