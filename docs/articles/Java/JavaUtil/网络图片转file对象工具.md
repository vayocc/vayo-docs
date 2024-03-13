# 网络图片转file对象工具

# 网络图片转file对象

HUTOOL

```java
/**
     *
     * @param imgURL
     * @param pathName  文件名不带后缀
     * @return
     */
    @SneakyThrows
    public static File webImgUrlToFile(String imgURL, String pathName){
        HttpURLConnection conn = webUrl2Connection(imgURL);
        File file = FileUtil.file(pathName);
        // 会自动关闭流
        FileUtil.writeFromStream(conn.getInputStream(),file);
        return  file ;
    }
```

```java
@SneakyThrows
    public static HttpURLConnection webUrl2Connection(String imgURL){
        if (StrUtil.isBlank(imgURL) || !imgURL.contains("http")) {
            throw new ServerException("图片地址不正确，请检查图片地址。");
        }
        // 创建URL  将URL字符串转换为URL对象，并做必要验证
        URL url = URLUtil.toUrlForHttp(imgURL);
        // 创建链接
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(5000);
        String contentType = conn.getContentType(); // image/jpeg //  text/html;charset=utf-8
        if (StrUtil.isBlank(contentType)) {
            log.error("解析图片地址失败 contentType:{},imgURL{}", contentType, imgURL);
            throw new ServerException("解析图片地址失败");
        } else {
            if (!contentType.startsWith("image")) {
                log.error("解析图片地址失败 contentType:{},imgURL{}", contentType, imgURL);
                throw new ServerException("解析图片地址失败");
            }
        }
        return conn;
    }
```

# *网络图片转成 BASE 64*

```java
/**
     * 网络图片转成 BASE 64
     * https://www.cnblogs.com/tovep/articles/2435858.html  这边还有一种写法
     * <p>
     * 原文 地址 https://blog.csdn.net/lihuazaizheli/article/details/119745811?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-5.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-5.no_search_link
     * 判断是否是图片 参考： https://my.oschina.net/u/3994156/blog/2994129
     *
     * @param imgURL
     * @return
     */
    @SneakyThrows
    public static String imageToBase64ByOnline(String imgURL , boolean base64Prefix)  {
        ByteArrayOutputStream data = new ByteArrayOutputStream();
        InputStream is = null;
        try {
            HttpURLConnection conn = webUrl2Connection(imgURL);
            is = conn.getInputStream();
            // 将内容读取内存中
            int len = -1;
            byte[] by = new byte[1024];
            while ((len = is.read(by)) != -1) {
                data.write(by, 0, len);
            }

            // 对字节数组进行Base64编码，得到Base64编码的字符
            String newBase64str = Base64.getEncoder().encodeToString(data.toByteArray());
            if (base64Prefix){
                return base64PrefixConverter(newBase64str,conn.getContentType());
            }
            return newBase64str;
        } catch (IOException e) {
            log.error("网络图片转base64失败;{}",e.getMessage());
            throw new ServerException("网络图片转base64失败");
        } finally {
            IoUtil.close(is);
            IoUtil.close(data);
        }
    }
```

```java
@SneakyThrows
    public static String base64PrefixConverter(String base64Data,String contentType)  {
        return  "data:" + contentType + ";base64," + base64Data ;
    }
```

```java
@SneakyThrows
    public static HttpURLConnection webUrl2Connection(String imgURL){
        if (StrUtil.isBlank(imgURL) || !imgURL.contains("http")) {
            throw new ServerException("图片地址不正确，请检查图片地址。");
        }
        // 创建URL  将URL字符串转换为URL对象，并做必要验证
        URL url = URLUtil.toUrlForHttp(imgURL);
        // 创建链接
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(5000);
        String contentType = conn.getContentType(); // image/jpeg //  text/html;charset=utf-8
        if (StrUtil.isBlank(contentType)) {
            log.error("解析图片地址失败 contentType:{},imgURL{}", contentType, imgURL);
            throw new ServerException("解析图片地址失败");
        } else {
            if (!contentType.startsWith("image")) {
                log.error("解析图片地址失败 contentType:{},imgURL{}", contentType, imgURL);
                throw new ServerException("解析图片地址失败");
            }
        }
        return conn;
    }
```

# 网络图片判断是否1:1 3:4 1:3 以及最小宽度
```Java
    public static BufferedImage read(String webUrl){
        BufferedImage result;
        try {
            result = ImageIO.read(URLUtil.url(webUrl));
        } catch (Exception e) {
            throw new ServiceException("url非图片，请检查");
        }
        return result;
    }

    /**
     * 判断图片是否是1:1 或者 3:4
     * @param webUrl
     * @return
     */
    public static boolean imageSizeCheckRatio11OR34(String webUrl){
        BufferedImage result = read(webUrl);
        return imageSizeCheckRatio11OR34(result);
    }

    /**
     *  判断图片是否是1:1 或者 3:4 并且宽度大于某个值
     * @param webUrl
     * @param minWidth
     * @return
     */
    public static boolean imageSizeCheckRatio11OR34(String webUrl ,int minWidth ){
        BufferedImage result = read(webUrl);
        return imageSizeCheckRatio11OR34(result,minWidth);
    }

    /**
     * 判断宽高比为1:1 或者3:4 最小宽度
     * @param bufferedImage
     * @param minWidth 最小宽度
     * @return
     */
    public static boolean imageSizeCheckRatio11OR34(BufferedImage bufferedImage,int minWidth){
        if (bufferedImage.getWidth() >= minWidth &&  imageSizeCheckRatio11OR34(bufferedImage)) {
            return true;
        }
        return false;
    }

    /**
     * 判断宽高比为1:1 或者3:4
     * @param bufferedImage
     * @return
     */
    public static boolean imageSizeCheckRatio11OR34(BufferedImage bufferedImage){
        int width = bufferedImage.getWidth();
        int height = bufferedImage.getHeight();
        double aspectRatio = (double) width / height;
        boolean isRatio1To1 = Math.abs(aspectRatio - 1) < 0.01; // 允许一定的误差
        boolean isRatio3To4 = Math.abs(aspectRatio - 0.75) < 0.01; // 允许一定的误差
        if (isRatio1To1 || isRatio3To4) {
            return true;
        }
        return false;
    }


    /**
     * 判断宽高比大于1:3  最小宽度
     * @param bufferedImage
     * @param minWidth 最小宽度
     * @return
     */
    public static boolean imageSizeCheckRatioGE13(BufferedImage bufferedImage,int minWidth){
        if (bufferedImage.getWidth() >= minWidth &&  imageSizeCheckRatioGE13(bufferedImage)) {
            return true;
        }
        return false;
    }

    /**
     * 判断宽高比 大于等于 1:3
     * @param bufferedImage
     * @return
     */
    public static boolean imageSizeCheckRatioGE13(BufferedImage bufferedImage){
        int width = bufferedImage.getWidth();
        int height = bufferedImage.getHeight();
        double aspectRatio = (double) width / height;
        double targetAspectRatio = 1.0 / 3.0;
        if (aspectRatio >= targetAspectRatio) {
            return true;
        }
        return false;
    }
```

# 生成填充白色背景(按照宽度)的正方形
```Java
     /**
     * 生成填充白色背景(按照宽度)的正方形
     * @param sourceBufferedImage
     * @return
     */
    @NotNull
    private static BufferedImage imageWhiteBackground(BufferedImage sourceBufferedImage, int targetWidth, int targetHeight ) {
        BufferedImage outImage;
        //如果不是正方形，获取最大宽度重新生成一个图片
        //判断宽高最大的一个值
        outImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = GraphicsUtil.createGraphics(outImage, Color.white);
        // 设置图片居中显示
        graphics.drawImage(sourceBufferedImage, (targetWidth - sourceBufferedImage.getWidth()) / 2, (targetHeight - sourceBufferedImage.getHeight()) / 2, null);
        graphics.dispose();
        return outImage;
    }
```

# 自适应图片尺寸为 1:1  （这个方法不提前判断）
```Java
    /**
     * 自适应图片尺寸为 1:1  （这个方法不提前判断）
     * @param sourceBufferedImage
     * @param targetWidth 目标宽度
     * @param suffix 文件后缀 StrUtil.subAfter(webUrl, ".", true);
     * @return
     */
    @SneakyThrows
    public static File imageAdaptive11(BufferedImage sourceBufferedImage,int targetWidth,String suffix){
        BufferedImage bufferedImage = imageAdaptive11(sourceBufferedImage, targetWidth);
        String pathName = PathMapperUtil.getTempFileDir() + File.separator + UUID.fastUUID() + "." + suffix;
        File touch = FileUtil.touch(FileUtil.file(pathName));
        ImageIO.write(bufferedImage, suffix, touch);
        return touch;
    }
    /**
     *
     * 自适应图片尺寸为 1:1  （这个方法不提前判断）
     *
     * @param sourceBufferedImage
     * @return
     */
    public static BufferedImage imageAdaptive11(BufferedImage sourceBufferedImage,int targetWidth){
        // 判断最长的宽高，
        int sourceWidth = sourceBufferedImage.getWidth();
        int sourceHeight = sourceBufferedImage.getHeight();
        int maxSize = Math.max(sourceWidth, sourceHeight);
        BufferedImage targetBuff;
        //如果目标宽度>=最长宽高，直接居中填充白边，
        if (targetWidth >= maxSize) {
            // 这个方法之前会调用宽高比的判断，所以应该不存在宽高都等于的情况。
            targetBuff = imageWhiteBackground(sourceBufferedImage, targetWidth, targetWidth);
        }else{
            /**   //如果目标宽度<最长宽高，缩小到最长宽高，(再多缩小一部分) 然后再填充白边
             *    这个缩小后好像忘记填充白边了，发现有自动的工具，用自带的。
             *  BigDecimal div = NumberUtil.div(Integer.toString(targetWidth), Integer.toString(sourceBufferedImage.getWidth()), 2, RoundingMode.HALF_UP);
             *  Image scale = ImgUtil.scale(sourceBufferedImage, div.floatValue());
             *  targetBuff = ImgUtil.toBufferedImage(scale);
             */
            // 这个方法自动截取后会变成jpg，如果想要保持原文件格式，scale方法里面还有个生成file 的方法是生成文件夹的
            Image scale = ImageUtils.scale(sourceBufferedImage, targetWidth, targetWidth, Color.white);
            targetBuff = ImgUtil.toBufferedImage(scale);
        }
        return targetBuff;
    }
```


# 自适应图片大于等于1:3  （这个方法不提前判断
```Java
   /**
     *
     * 自适应图片大于等于1:3  （这个方法不提前判断）
     *
     *  主要采取宽度保持不变，高度截取的办法， 默认截取1:2好了
     * @param sourceBufferedImage
     * @param minWidth 最小宽度
     * @param targetHeight 最目标高度
     * @return
     */
    public static List<File> imageAdaptiveGE13(BufferedImage sourceBufferedImage,int minWidth,int targetHeight){
        // 判断最长的宽高，
        int sourceWidth = sourceBufferedImage.getWidth();
        // 判断是否小于宽度如果小于自动放大，如果大于等于不管
        if (sourceWidth < minWidth) { // 放大
            BigDecimal div = NumberUtil.div(Integer.toString(minWidth), Integer.toString(sourceBufferedImage.getWidth()), 2, RoundingMode.HALF_UP);
            Image scale = ImgUtil.scale(sourceBufferedImage, div.floatValue());
            sourceBufferedImage = ImgUtil.toBufferedImage(scale);
        }
        List<File> fileList = longPictureCut(sourceBufferedImage, minWidth, targetHeight);
        return fileList;
    }
    
```

# 长图切割
```Java
    /**
     * 长图切割
     * @param bufferedImage 原始图片的
     * @param width
     * @param height
     * @return
     */
    public static List<File> longPictureCut(BufferedImage bufferedImage, int width, int height){
        List<File> objects = new ArrayList<>();
        // 计算出长度然后截取 长度最后一张不要截图那么长
        int heightNum = bufferedImage.getHeight();
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
            // 长图按照矩形 变成 多图
            Rectangle rectangle = new Rectangle(0,start,width, segmentLength);
            File file = new File(PathMapperUtil.getTempFileDir(), "cat" + UUID.fastUUID() + "." + ImgUtil.IMAGE_TYPE_JPG);
            ImgUtil.cut(bufferedImage,file,rectangle);

            objects.add(file);
        }
        return objects;
    }
```

::: details 写法太丑 弃用了
```java
/**
     * 判断是否正方形
     * @param bufferedImage
     * @return
     */
    public  static  boolean checkSquare(BufferedImage bufferedImage){
        int height = bufferedImage.getHeight();
        int width = bufferedImage.getWidth();
        return  width == height ;

    }

/**
     * 输出 file文件
     *  判断是否正方形，如果不是填充白色背景，
     * @param webUrl
     * @param square 是否要正方形
     * @param targetWH  写了的话固定宽高
     * @return
     */
    @SneakyThrows
    public static  File webUrl2RelativeFile(String webUrl, boolean square ,int targetWH) {
        // 判断
        BufferedImage bufferedImage = ImgUtil.read(URLUtil.url(webUrl));
        boolean b = false;
        if (square) {
            b = ImageUtils.checkSquare(bufferedImage);
        }
        String suffix = StrUtil.subAfter(webUrl, ".", true);
        String pathName = PathMapperUtil.getTempFileDir() + File.separator + UUID.fastUUID() + "." + suffix;

        BufferedImage outImage = bufferedImage;
        if (square && !b) { // 如果要正方形并且不是正方形
            outImage = squareWhiteBackground(bufferedImage);
        }
        // 有值的话 变成这个宽高的正方形
        if (square && 0 != targetWH) {
            if (outImage.getHeight() != targetWH) {
                Image scale = ImgUtil.scale(outImage, targetWH, targetWH);
                outImage = ImgUtil.toBufferedImage(scale);
            }
        }
        File touch = FileUtil.touch(FileUtil.file(pathName));
        ImageIO.write(outImage, suffix, touch);
        return touch;
    }

    /**
     * 生成填充白色背景的正方形，按照最大宽度
     * @param bufferedImage
     * @return
     */
    @NotNull
    private static BufferedImage squareWhiteBackground(BufferedImage bufferedImage) {
        BufferedImage outImage;
        //如果不是正方形，获取最大宽度重新生成一个图片
        //判断宽高最大的一个值
        int max = Math.max(bufferedImage.getWidth(), bufferedImage.getHeight());
        outImage = new BufferedImage(max, max, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = GraphicsUtil.createGraphics(outImage, Color.white);
        // 设置图片居中显示
        graphics.drawImage(bufferedImage, (max - bufferedImage.getWidth()) / 2, (max - bufferedImage.getHeight()) / 2, null);
        graphics.dispose();
        return outImage;
    }
```
:::

