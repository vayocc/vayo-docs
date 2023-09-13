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

# 网络图片转正方形(可以指定宽高)

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