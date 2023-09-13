# html转图片

参考：

[flyingsaucer进行html文件转图片和pdf_凌波漫步&的博客-CSDN博客](https://www.notion.so/flyingsaucer-html-pdf_-CSDN-6bece8e787a74620a580cd7e70e74029?pvs=21)

[基于xhtmlrenderer+freemarker的HTML转图片方法_键盘满配的博客-CSDN博客](https://www.notion.so/xhtmlrenderer-freemarker-HTML-_-CSDN-a9ebea7931e7401e812b0ef11ebc0bd0?pvs=21)

[SpringBoot下载freemarker转换的图片（高清不模糊）_wx5faa6aeda7728的技术博客_51CTO博客](https://blog.51cto.com/u_14998860/4866911)

我的代码

maven

```xml
<!-- https://mvnrepository.com/artifact/org.xhtmlrenderer/flying-saucer-core -->
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-core</artifactId>
    <version>9.1.22</version>
</dependency>
```
生成长图并截取

```java
/**
     *  str格式的html转长图并截取
     *
     * @param html html 代码的字符串
     * @param width
     * @param height
     * @return
     * @throws IOException
     */
    @SneakyThrows
    public static  List<File> renderer(String html, int width ,int height)  {

        List<File> objects = new ArrayList<>();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start("1");
        File originalDest = FileUtil.touch(FileUtil.file(PathMapperUtil.getTempFileDir() +   File.separator + UUID.fastUUID()  + "." + ImgUtil.IMAGE_TYPE_PNG));
        Document dom = XMLResource.load(new StringReader(html)).getDocument();        // 有些css样式不支持，如背景颜色
        Java2DRenderer renderer = new Java2DRenderer(dom, width);
        // renderer.setBufferedImageType(BufferedImage.TYPE_INT_ARGB); // TYPE_INT_RGB

        SharedContext sharedContext = renderer.getSharedContext();
        sharedContext.setDotsPerPixel(1); // 每个像素有3个点。这个值会影响图像的大小和清晰度。
        sharedContext.setDPI(1000); //码设置图像的分辨率，即每英寸点数（DPI）。在这个例子中，图像的DPI为523。这个值会影响图像的大小和清晰度。

        renderer.setBufferedImageType(BufferedImage.TYPE_INT_ARGB);

        //        KEY_ANTIALIASING：指定抗锯齿是否应用于呈现。VALUE_ANTIALIAS_ON表示应用抗锯齿。
        //        KEY_COLOR_RENDERING：指定颜色呈现质量。VALUE_COLOR_RENDER_QUALITY表示使用最高质量的颜色呈现。
        //        KEY_DITHERING：指定是否应该使用抖动。VALUE_DITHER_ENABLE表示启用抖动。
        //        KEY_FRACTIONALMETRICS：指定字体呈现时是否应使用精确的度量。VALUE_FRACTIONALMETRICS_ON表示使用精确的度量。
        //        KEY_INTERPOLATION：指定图像缩放时使用的插值算法。VALUE_INTERPOLATION_BICUBIC表示使用双三次插值算法。
        //        KEY_RENDERING：指定呈现质量。VALUE_RENDER_QUALITY表示使用最高质量的呈现。
        //        KEY_TEXT_ANTIALIASING：指定文本抗锯齿是否应用于呈现。VALUE_TEXT_ANTIALIAS_ON表示应用文本抗锯齿。
        //        KEY_ALPHA_INTERPOLATION：指定透明度呈现质量。VALUE_ALPHA_INTERPOLATION_QUALITY表示使用最高质量的透明度呈现。
        //        KEY_STROKE_CONTROL：指定笔画呈现质量。VALUE_STROKE_PURE表示使用最高质量的笔画呈现。
        Map map = new HashMap<>();//设置参数
        map.put(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        map.put(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        map.put(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
        map.put(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        map.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        map.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        map.put(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        map.put(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
        map.put(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
        renderer.setRenderingHints(map);

        BufferedImage java2dImage = renderer.getImage();
        new FSImageWriter().write(java2dImage, originalDest.toString());
        // 计算出长度然后截取 长度最后一张不要截图那么长
        BufferedImage bufferedImage = ImgUtil.read(originalDest);
        int heightNum = bufferedImage.getHeight();
        // int width  = 750 ;
        int segmentLength = height;
        int numSegments = heightNum / segmentLength;
        int remainder = heightNum % segmentLength;
        for (int i = 0; i <= numSegments; i++) {
            int start = i * segmentLength;
            if(i == numSegments  ){
                if(remainder == 0 ){
                    continue;
                }
                segmentLength = remainder;
            }
            // 长图按照1:3 变成 多图
            Rectangle rectangle = new Rectangle(0,start,width, segmentLength);
            File file = new File(PathMapperUtil.getTempFileDir(), "cat" + UUID.fastUUID() + "." + ImgUtil.IMAGE_TYPE_PNG);
            ImgUtil.cut(bufferedImage,file,rectangle);
            objects.add(file);
        }
        stopWatch.stop();
        FileUtil.del(originalDest);
        log.info(" 长图截取 end 【{}】", stopWatch.getTotalTimeMillis());
        return objects;
    }
```
