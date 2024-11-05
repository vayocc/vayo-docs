# Redis6学习笔记  - 展开标题

# 前言

参考：

[01-课程介绍_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Rv41177Af?p=1&vd_source=820e1d31b3317087dfbc6234c508fe5e)

![df45ad71d23d4a317d32d03a3b3109b.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/df45ad71d23d4a317d32d03a3b3109b.png)

![407f6c046895d2a6d883ff27a61439a.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/407f6c046895d2a6d883ff27a61439a.png)

![656dd9aa96c97ea5b494a04bcfc1728.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/656dd9aa96c97ea5b494a04bcfc1728.png)

![3e02fa803fa0c7f6b14d829538cf4ae.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/3e02fa803fa0c7f6b14d829538cf4ae.png)

## nosql的适用与不适用

![4a5957bc85b495457ac83091d3ba4b7.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/4a5957bc85b495457ac83091d3ba4b7.png)

![Untitled](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled.png)

![0678d25f75c42f293d135d4ee3fdd46.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/0678d25f75c42f293d135d4ee3fdd46.png)

## 多样的数据结构存储持久化数据

![a28e0a288cf304d8347f9e4e3daa3c4.png](Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/a28e0a288cf304d8347f9e4e3daa3c4.png)

# 1 Redis基础介绍

redis启动

- 前台启动 ---->redis-server
- 后台启动
    - 修改配置文件，将/opt/reids/redis.conf文件中的daemonize 的no值修改为yes，即支持后台启动
    - **`redis-server /opt/redis/redis.conf`**  即可后台启动(也可将redis.conf复制到其它的目录,启动时使用该路径即可)
- 访问redis客户端
    - `**redis-cli` ｜｜ `redis-cli -p 6379`**
- 查看是否启动  **`ps -ef|grep redis`**
- redis的关闭
    - 单实例：进入客户端后使用命令shutdown 或者 （  **`redis-cli shutdown`** ）
    - 多实例：找到redis-server的线程号，直接杀死该线程  **`redis-cli -p 6379 shutdown`**
    
    ### redis相关知识+解释单线程+多路io复用
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_1.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_2.png)
    
    ### key的相关操作
    
    | 命令 | 作用 |  |
    | --- | --- | --- |
    | **keys *** | 查看当前数据库的所有键 |  |
    | set key value | 添加键值 |  |
    | exists key | 判断某个key是否存在 |  |
    | type key | 查看key的类型 |  |
    | del key | 删除指定的key数据 |  |
    | unlink key | 根据value选择非阻塞删除   仅 将 keys 从 keyspPace 元 数据 中 删除 ， 真 正 的 删除 会 在 后 续 异 步 操 作 |  |
    | expire key seconds | 给指定的Key设置过期时间 |  |
    | ttl key | 查看当前key还有多少秒过期，-1表示永不过期，-2表示已过期 |  |
    | select nums | 切换数据库,redis默认有16个数据库，默认使用0号数据库 |  |
    | dbsize | 产看当前数据库key的数量 |  |
    | flushdb | 清空当前库 |  |
    | flushall | 清空所有的库 |  |
    - redisObject类型
        
        ```
        typedef struct redisObject {
            unsigned type:4;  //对象的数据类型
            unsigned encoding:4; //对象的编码格式
            unsigned lru:LRU_BITS; /* lru time (relative to server.lruclock) */
            int refcount;
            void *ptr; //指向真正的数据
        } robj;
        1234567
        ```
        
        - type的五种取值
            - OBJ_STRING, OBJ_LIST, OBJ_SET, OBJ_ZSET, OBJ_HASH
        - encoding的取值
            - OBJ_ENCODING_RAW: 最原生的表示方式。其实只有string类型才会用这个encoding值（表示成sds）。
            - OBJ_ENCODING_INT: 表示成数字。实际用long表示。
            - OBJ_ENCODING_HT: 表示成dict。
            - OBJ_ENCODING_ZIPMAP: 是个旧的表示方式，已不再用。在小于Redis 2.6的版本中才有。
            - OBJ_ENCODING_LINKEDLIST: 也是个旧的表示方式，已不再用。
            - OBJ_ENCODING_ZIPLIST: 表示成ziplist。
            - OBJ_ENCODING_INTSET: 表示成intset。用于set数据结构。
            - OBJ_ENCODING_SKIPLIST: 表示成skiplist。用于sorted set数据结构。
            - OBJ_ENCODING_EMBSTR: 表示成一种特殊的嵌入式的sds。
            - OBJ_ENCODING_QUICKLIST: 表示成quicklist。用于list数据结构。
        - 作用
            - 为多种数据类型提供一种统一的表示方式。
            - 允许同一类型的数据采用不同的内部表示，从而在某些情况下尽量节省内存。
            - 支持对象共享和引用计数。当对象被共享的时候，只占用一份内存拷贝，进一步节省内存。
    
    # 2 基础数据类型
    
    ## 2.1 string（key最大512m）
    
    ### 2.1.1 相关命令
    
    | 命令 | 作用 |
    | --- | --- |
    | set key value | 添加键值对 |
    | get key | 查询对应键的值 |
    | append key value | 将给定的value追加到原value的末尾 |
    | strlen key | 获取当前键的值的长度 |
    | setnx key value | 当key不存在时，设置key的值 |
    | incr key | 将键值增加1，只能对数字值进行操作，若当前key不存在则将Key的值设为1 |
    | decr key | 将键值减少1，只能对数字值进行操作，若当前key不存在则将Key的值设为-1 |
    | incrby / decrby key step | 与incr和decr一致，可以自定义步长 step |
    | mset key1 value1 key2 value2 … | 同时设置一个或者多个键值对 |
    | mget key1 key2… | 同时获取多个value |
    | msetnx key1 value1 key2 value2… | 同时设置一个或者多个键值对，当且仅当所有的Key都不存在时才会设置 |
    | getrange key start end | 获取值的范围,与java中的substring类似，前后都是闭包 |
    | setrange key start value | 用value的值覆盖从start开始的值，有几位覆盖几位 |
    | setex key seconds value | 设置键值的同时设置过期时间 |
    | getset key value | 得到旧的值，同时用value替换原有的值 |
    
    ### 2.1.2 redis 是原子性的java不是
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_3.png)
    
    ### 2.1.3 数据结构
    
    - type = OBJ_STRING
        - encoding = OBJ_ENCODING_RAW: string采用原生的表示方式，即用sds来表示
        - encoding = OBJ_ENCODING_EMBSTR: string采用一种特殊的嵌入式的sds来表示
        - encoding = OBJ_ENCODING_INT: string采用数字的表示方式，实际上是一个long型。
    - String类型时二进制安全的，意味着redis的String可以包含任何类型的数据
    - 
        
        简单动态字符串(Simple Dynamical String)，需要时才扩容，类似于Java中的ArrayList，1M以下增加1倍，1M以上一次增加1M，最大512M。
        
    - [SDS](https://so.csdn.net/so/search?q=SDS&spm=1001.2101.3001.7020)保存了字符串的长度
    - SDS可以预分配空间，修改SDS时先检查SDS空间是否足够，不够会先扩展SDS的空间，防止缓存溢出。
    
    ## 2.2 列表（List)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_4.png)
    
    ### 2.2.1 相关命令
    
    | 命令 | 作用 |
    | --- | --- |
    | lpush/rpush key1 value1 key2 value2 | 从左边/右边插入一个或者多个值 |
    | lpop/rpop key | 从左边或者右边弹出一个值，值在键在，值光键亡 |
    | lrange key start stop | 按照索引下标获得元素,从左到右，0表示左边第一个，-1表示右边第一个 |
    | lindex key index | 根据index的值获取元素（从左到右) |
    | llen key | 获取链表的长度 |
    | linsert key before/after value newvalue | 在value的前面或者后面插入newvalue |
    | lrem key n value | 从左边删除n个指定的value |
    | lset key index value | 将index处的值替换为value |
    
    ### 2.2.3 数据结构
    
    - 快速链表 quicklist（宏观上是双向链表)
        - 数据少时是ziplist，元素挨着存储，分配的内存空间是连续的
            - 由表头和N个entry节点和压缩列表尾部标识符zlend组成的一个连续的内存块。然后通过一系列的编码规则，提高内存的利用率，主要用于存储整数和比较短的字符串。可以看出在插入和删除元素的时候，都需要对内存进行一次扩展或缩减，还要进行部分数据的移动操作，这样会造成更新效率低下的情况
        - 数据量较多时改为quicklist，多个ziplist使用双向指针穿起来
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_5.png)
    
    ## 2.3 hash
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_6.png)
    
    ### 2.3.1 常用命令
    
    | 命令 | 作用 |
    | --- | --- |
    | HSET key field value | 添加或者修改hash类型key的filed的值 |
    | HGET key field | 获取一个hash类型的key的field的值 |
    | HMSET key field value [field value …] | 设置一个hash类型的key的多个field的值 |
    | HMGET key field [field …] | 获取一个hash类型的key的多个field的值 |
    | hexists key field | 判断存在 1 存在  0不存在 |
    | HGETALL key | 获取一个hash类型的key的所有field和value |
    | HKEYS key | 获取一个hash类型的key的所有field |
    | HVALS key | 获取一个hash类型的key的所有value |
    | HSETNX key field value | 设置filed-value，不存在就设置，存在则无效 |
    |  |  |
    
    ### 2.3.2 数据结构
    
    - field : value（类似HashMap`<String,Object>`)
    - set数据较少：ziplist
        - 键的个数小于512，值的大小不超过64字节
    - 数据较多: hashtable
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_7.png)
    
    ## 2.4 set
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_8.png)
    
    ### 2.4.1 常用命令
    
    | 命令 | 作用 |
    | --- | --- |
    | SADD key member | 向set中添加一个或多个元素 |
    | SISMEMBER key member | 判断一个元素是否存在于set中 |
    | SREM key member | 移除set中的指定元素 |
    | SCARD key | 返回set中元素的个数 |
    | SMEMBERS | 获取set中的所有元素 |
    | SINTER key1 key2 | 求key1与key2的交集 |
    | SDIFF key1 key2 | 求key1与key2的差集 |
    | SUNION key1 key2 | 求key1和key2的并集 |
    
    ### 2.4.2 数据结构
    
    - intset：集合中都是整数，且数据量不超过512个，使用intset(有序且不重复的连续空间)
    - String类型的set集合，底层是value为null的hash表，dict的结构
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_9.png)
    
    ## 2.5 zset ( sort-set )
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_10.png)
    
    ### 2.5.1常用命令
    
    | 命令 | 作用 |
    | --- | --- |
    | ZADD key score member | 添加一个或多个元素到sorted set ，如果已经存在则更新其score值 |
    | ZRANGE key min max | 按照score排序后，获取指定排名范围内的元素 |
    | ZRANGE key min max withscores | 按照score排序后，获取指定排名范围内的元素 (带评分) |
    | ZRANGEBYSCORES  key min max | 按照score排序后，获取指定score范围内的元素 |
    | ZREVRANGEBYSCORE key min max | 倒序排序 |
    | ZREM key member | 删除sorted set中的一个指定元素 |
    | ZSCORE key member | 获取sorted set中的指定元素的score值 |
    | ZRANK key member | 获取sorted set 中的指定元素的排名 |
    | ZCARD key | 获取sorted set中的元素个数 |
    | ZCOUNT key min max | 统计score值在给定范围内的所有元素的个数 |
    | ZINCRBY key 500 member | 让sorted set中的指定元素自增，步长为指定的500 值 |
    | ZDIFF、ZINTER、ZUNION | 求差集、交集、并集 |
    
    ### 2.5.2数据结构
    
    - 有序的set集合，每个元素关联一个评分(score)，元素唯一，但是不同元素的score可以重复
    - ziplist
        - 键值对个数小于128，ziplist数据项小于256
        - 集合中每个数据的大小都要小于64字节
    - 类似于`Map<String,Double>`
        - hash表关联value和score
        - 跳跃表用于给value排序，根据score的范围获取元素列表
            
            ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_11.png)
            
        
![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_12.png)
    

### 2.5.3 跳跃表

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_13.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_14.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_15.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_16.png)

## 2.6 bitmaps (新)
    
![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_17.png)

### 2.6.1 命令


💡 专门操作以位为单位的字符串



| 常用命令                                                                                  | 例子                                                 | 作用                                |
|---------------------------------------------------------------------------------------|----------------------------------------------------|-----------------------------------|
| SETBIT key offset value                                                               |                                                    | 向指定位置存入0或者1                       |
| GETBIT key offset                                                                     |                                                    | 获取指定位置的bit                        |
| BITCOUNT key                                                                          |                                                    | BITCOUNT key [start end]          |  | 获取指定范围内1的个数  -1表示最后一位  -2表示倒是第二位 |
| BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] |                                                    | 操作指定位置的bit type指定符号数(u为无符号，i为有符号) |
| BITPOS key bit [start] [end]                                                          |                                                    | 获取指定范围内第一个出现的1                    |
| bitop and (or/not/xor ) `<destkey>` [key…]                                              | bitop and unique:users:and:20201104_03             |                                   |
| unique:users:20201103unique:users:20201104                                            | bitop是一个复合操作 and交集 or并集 not非   xor异或 将结果保留到destkey |                                   |

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_18.png)

### 2.6.2 bitmaps和set对比


💡 适合存储活跃用户



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_19.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_20.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_21.png)

## 2.7 hyperLongLong (新)


💡 主要用于解决基数去重
    


![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_22.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_23.png)

### 2.7.1 相关命令

| 常用命令 |  | 作用 |
| --- | --- | --- |
| PFADD key element… |  | 添加数据到HyperLogLog 成功1 不成功0 |
| PFCOUNT key |  | 统计HyperLogLog中的个数，有一定的误差 |
| PFMERGE destkey [sourcekey…] |  | 将多个HyperLogLog合并为一个 |

## 2.8 geospatial  (新)


💡 经纬度



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_24.png)

| 常用命令                                                                                 |                                    | 作用                                                          |
|--------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------|
| GEOADD key longitude latitude member                                                 | geoadd. city 121.47 31.23 shanghai | 添加一个或者多个位置的经纬度信息到某个集合                                       |
| GEODIST key member1 member2 [m                                                       | km]                                | geoadd. city 121.47 31.23 shanghai 114.05 22.52 shenzhen    | 返回集合中两个位置的距离 |
| GEOHASH key member …                                                                 |                                    | 返回某个位置的hash                                                 |
| GEOPOS key member …                                                                  | geopos city shanghai               | 返回某个位置的经纬度信息                                                |
| GEOSERACH key [FROMMEMBER member] [FROMLONLAT longitude latitude] [BYRADIUS radius m | km] [ASC                           | DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST] [WITHHASH] |  | 在指定范围内搜索member，并按照与指定点之间的距离排序后返回。范围可以是圆形或矩形 |
| geodist key member1 member2  [单位]                                                    | geodist city beijing shanghai km   | 直线距离 m 表示单位为米[默认值]。                                         |
| km 表示单位为干米。， mi 表示单位为英里。ft 表示单位为英尺。                                                  |                                    |                                                             |
| georadius key longitude latitude raius  [单位]                                         | georadius city 110 30 1000 km      | 半径内的城市                                                      |

## 3 Redis客户端

[jedis -imooc](https://www.notion.so/jedis-imooc-700a8242540b4c52bd57bc16a13da70e?pvs=21) 

## 3.1 Jedis

```
package com.lzx;

import redis.clients.jedis.Jedis;

public class JedisTest {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        String result = jedis.ping();
        System.out.println(result);
        jedis.close();
    }
}

```

- Jedis连接池
    
    ```
    import redis.clients.jedis.JedisPool;
    import redis.clients.jedis.JedisPoolConfig;
    
    public class JedisConnectionFactory {
        private static final JedisPool jedisPool;
        static{
            JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
            jedisPoolConfig.setMaxTotal(8);
            jedisPoolConfig.setMaxIdle(8);
            jedisPoolConfig.setMinIdle(0);
    
            jedisPool = new JedisPool(jedisPoolConfig,"127.0.0.1",6379,1000);
        }
    
        public static Jedis getJedis(){
            return jedisPool.getResource();
        }
    }
    ```
    

## 3.2 手机验证码功能

- 3.2.1 生成6位随机数
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_25.png)
    
- 3.2.2 每个手机每天只能发3次 验证码2分钟有效
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_26.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_27.png)
    
- 校验验证码
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_28.png)
    

## 3.3 SprinBoot Redis

- 引入相关的依赖
    
    ```
         <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-redis</artifactId>
            </dependency>
            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-pool2</artifactId>
    						<version>2.6.0</version>
            </dependency>
    ```
    
    - 在application.yml中配置Redis信息
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_29.png)
    
- 配置类
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_30.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_31.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_32.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_33.png)
    
- controller调用
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_34.png)
    
    为了节省内存，也可以使用StringRedisTemplate对象，只能存放String类型的键和值，StringRedisTemplate的key和value默认使用StringRedisSerializer序列化器，当我们需要存放对象时，自己手动进行序列化，取出对象时，手动进行反序列化。
    
    - 注入StringRedisTemplate类，手动实现序列化和反序列化
    
    ```
    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.lzx.domain.User;
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.context.SpringBootTest;
    import org.springframework.data.redis.core.StringRedisTemplate;
    
    @SpringBootTest
    public class StringRedisTemplateTest {
    
        @Autowired
        private StringRedisTemplate stringRedisTemplate;
        //序列化类
        private static final ObjectMapper mapper = new ObjectMapper();
        @Test
        void testStringRedisTemplate() throws JsonProcessingException {
            User user = new User("张三", 18);
            String jsonString = mapper.writeValueAsString(user);
            stringRedisTemplate.opsForValue().set("user:1002",jsonString);
            String s = stringRedisTemplate.opsForValue().get("user:1002");
            User res = mapper.readValue(s, User.class);
            System.out.println(res);
        }
    }
    
    ```
    

# 4 redis6的事务和锁机制

## 4.1 了解redis事务

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_35.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_36.png)

## 4.2 事务操作流程multi exec discard

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_37.png)

- multi 组队阶段 (开启事务)
    - 添加命令1
    - 添加命令2
- exec 执行阶段 （提交事务）
- discard 抛弃命令队列（回滚事务）

## 4.3事务的错误处理

- 当添加命令阶段出现错误，当前命令队列将会被清空，无法执行
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_38.png)
    
- 当执行命令阶段出现错误，发生错误的命令不会成功执行，队列中其它命令均可以正常执行
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_39.png)
    

## 4.4  事务冲突

- 悲观锁：每次操作都上锁，一次只能一个操作
- 乐观锁：添加版本号，实际操作时判断版本号是否一致。适用于多读的应用类型，可以提高吞吐量。
    
    > 乐观锁(Optimistic Lock)，顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。乐观锁适用于多读的应用类型，这样可以提高吞吐量。Redis 就是利用这种 check-and-set机制实现事务的。
    > 
- watch key 在开启事务之前执行watch key指令，可以监视一个或者多个key，如果在事务执行之前这些被监视的key发生过改动，那么事务将会被打断。
    
    
    💡 可以监视一个或者多个
    
    
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_40.png)
    
    还有unwatch
    

## 4.5 Redis事务三个特性

1. 单独的隔离操作
2. 没有隔离级别的概念
3. 不保证原子性

## 4.6 秒杀案例

### 4.6.1 编写实现代码

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_41.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_42.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_43.png)

### 4.6.2 模拟ab工具模拟高并发秒杀出现库存\连接超时问题

- 问题1。库存问题

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_44.png)

- 问题2。连接超时问题

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_45.png)

### 4.6.3 问题解决（连接池和事务）

- 连接池解决连接超时
    
    
    💡 这不就是单例模式嘛
    
    
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_46.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_47.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_48.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_49.png)
    
- 超卖问题 （没加事务，乐观锁）
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_50.png)
    
    乐观锁
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_51.png)
    
    加redis事务
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_52.png)
    

### 4.6.4 因为乐观锁造成的新问题（lua脚本）

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_53.png)
    
![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_54.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_55.png)

lua脚本

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_56.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_57.png)

java使用

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_58.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_59.png)

## 5 Redis持久化

## 5.1 RDB （redis database）

在指定的时间间隔内将內存中的数据集快照写入磁盘，也就是行话讲的 Snapshot快照，它恢复时是将快照文件直接卖到内存里

### 5.1.1 了解rdb

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_60.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_61.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_62.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_63.png)

### 5.1.2 配置  以及 dump.rdb

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_64.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_65.png)

### stop-writes-on-bgsave-error

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_66.png)

### rdbcompression 压缩文件

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_67.png)

### rdbchecksum 检查完整性

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_68.png)

### 触发机制 3种

1. 手动（****手动触发****）
    
    > ① save命令和 bgsave命令都可以生成RDB文件。
    ② save命令会阻塞Redis服务器进程，直到RDB文件创建完毕为止，在Redis服务器阻塞期间，服务器不能处理任何命令请求。
    ③ bgsave命令会创建一个子进程，由子进程来负责创建RDB文件，父进程 (即Redis主进程) 则继续处理请求。
    ④ bgsave命令执行过程中，只有fork子进程时会阻塞服务器，而对于save命令，整个过程都会阻塞服务器，因此save已基本被废弃，线上环境要杜绝save的使用！！！
    > 
2. 自动（**在自动触发RDB持久化时，Redis也会选择bgsave而不是save来进行持久化。**）
    
    > #通过配置设置触发
    save m n
    #自动触发最常见的情况是在配置文件中通过save m n，**指定当m秒内发生n次变化时，会触发bgsave**。
    vim /etc/redis/6379.conf
    > 
    > - 更多…
    >     - ----219行--以下三个save条件满足任意一个时，都会引起bgsave的调用
    >     save 900 1 :当时间到900秒时，如果redis数据发生了至少1次变化，则执行bgsave
    >     save 300 10 :当时间到300秒时， 如果redis数据发生了至少10次变化，则执行bgsave
    >     save 60 10000 :当时间到60秒时，如果redis数据发生了至少10000次变化， 则执行bgsave
    >     - ----242行--是否开启RDB文件压缩
    >     rdbcompression yes
    >     - ----254行--指定RDB文件名
    >     dbfilename dump.rdb
    >     - ----264行--指定RDB文件和AOF文件所在目录
    >     dir /var/lib/redis/6379
3.   **其他自动触发机制**
    
    > 除了 save m n 以外，还有一些其他情况会触发bgsave:
    > 
    > 
    > ① 在主从复制场景下，如果从节点执行全量复制操作，则主节点会执行bgsave命令，并将rdb文件发送给从节点。
    > 
    > ② 执行shutdown命令时，自动执行rdb持久化。
    > 

---

### save

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_69.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_70.png)

### 命令 save VS bgsave

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_71.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_72.png)

### 5.1.3 优势 和 缺点

**优势**

1. 适合大规模的数据 恢复
2. 对 数据 完整 性和一致 要求 不 高 更 适合 使 用
3. 节省 磁盘 空间
4. 恢复 速度 快

**缺点**

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_73.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_74.png)

### 5.1.4 RDB备份还原


💡 根据配置文件里面的备份 文件自动还原备份


![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_75.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_76.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_77.png)

[redis的持久化：RDB的配置 - 天宇轩-王 - 博客园](https://www.cnblogs.com/dalianpai/p/12539240.html)

## 5.2 AOF（append only file）

### 5.2.1 了解AOF

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_78.png)

### AOF持久化流程

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_79.png)

### 5.2.2 配置


💡 **默认不开启**



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_80.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_81.png)


💡 同时开启听AOF的



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_82.png)

### **AOF同步频率设置**

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_83.png)

### rewrite重写压缩操作

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_84.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_85.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_86.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_87.png)

### 5.2.3 AOF 优点 缺点

### 优点

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_88.png)

### 缺点

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_89.png)

### 5.2.4 AOF备份还原

- **常规恢复 和rdb一样**
    
    ![Untitled.png]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_90.png)
    
- **异常恢复**
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_91.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_92.png)
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_93.png)
    

# 6 RDB和AOF用哪个呢？

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_94.png)

## 官方建议

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_95.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_96.png)

### 性能建议

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_97.png)

# 7 redis主从复制

## 7.1 了解redis主从复制

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_98.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_99.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_100.png)

### 原理

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_101.png)

## 7.2 配置redis主从复制

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_102.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_103.png)

### 进入指定端口的redis客户端

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_104.png)

### 配置从服务器并查看信息


💡 **这一步很奇怪 要进入从服务器里面 进行 命令设置**



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_105.png)

### 测试

1. 主机写入key
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_106.png)
    
2. 从机器就有了
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_107.png)
    
3. 从机不能进行写操作
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_108.png)
    

## 7.3 常见三招

### 7.3.1 一主二仆


💡 当主服务器挂掉，从服务 从状态看是主挂了，但是不会篡位，主好了以后还是原来的大哥。




💡 当从服务器挂掉。重启后依旧会主动要全量的数据，进行同步。



### 7.3.2 薪火相传


💡 主-从-从的结构 ，



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_109.png)

### 7.3.3 反客为主


💡 从服务器输入SLAVEOF NO ONE ； 当主挂掉了， 在从客户端输入SLAVEOF NO ONE，从服务立马上位



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_110.png)

## 7.4 哨兵模式(sentinal)


💡 反客为主的自动版，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转为主库



### 7.4.1 了解

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_111.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_112.png)

### 7.4.2 创建哨兵文件，并写配置

创建 **sentinal.conf**   配置文件 。写入：

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_113.png)

### 7.4.3 执行命令

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_114.png)

### 7.4.4 哨兵规则

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_115.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_116.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_117.png)

### 7.4.5 缺点

### 复制延时

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_118.png)

### 7.4.6 jedis代码

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_119.png)

# 8 redis 集群

## 8.1 了解redis集群

### 问题

- 容量不够，redis如何进行扩容？
- 并发写操作，redis如何分摊？

另外，主从模式，薪火相传模式，主机宕机，导致 ip 地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。

之前通过代理主机来解决，但是 redis3.0 中提供了解决方案。就是无中心化集群配置。

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_120.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_121.png)

### 什么是集群

Redis 集群实现了对 Redis 的水平扩容，即启动N个 redis 节点，将整个数据库分布存储在这N个节点中，每个节点存储总数据的1/N。

Redis 集群通过分区（partition） 来提供一定程度的可用性（availability）：即使集群中有一部分节点失效或者无法进行通讯，集群也可以继续处理命令请求。

## 8.2 搭建redis集群

> 制作6个实例
> 

### 8.2.1 配置

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_122.png)

1. 配置基本信息
        
![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_123.png)
        
2. cluster配置
    
    ![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_124.png)
    

### 8.2.2 复制配置文件并替换

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_125.png)

### 8.2.3 替换修改文本

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_126.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_127.png)

### 8.2.4 启动6个服务并查看状态

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_128.png)

### 8.2.5 将6个节点合成一个集群 （重点）


💡 组合之前，请确保所有 redis 实例启动后，ngdes-xooox。conf 文件都生成正常。




💡 进入src目录下



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_129.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_130.png)

### 8.2.6 运行命令，他会自己做分配

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_131.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_132.png)

### 8.2.7 进入集群

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_133.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_134.png)

## 8.3 集群操作

### 8.3.1 redis cluster 是如何分配这6个节点的

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_135.png)

### 8.3.2 什么是slot

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_136.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_137.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_138.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_139.png)

### 8.3.3 查看集群中的值

| 命令                            | 描述                                           |
|-------------------------------|----------------------------------------------|
| cluster keyslot {k1}          | 对应key的slot是多少                                |
| cluster countkeysinslot 12706 | 对应slot的value是多少【不再slot所在的服务器不能获取的到， 要先切换服务器】 |
| cluster getkeysinslot  4847 1 | 返回 count 个 slot 槽中的键                         |

### 8.3.4 但是不能插入多key 要设置 组

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_140.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_141.png)

## 8.4 redis集群 故障恢复


💡 某一个集群里面主服务器挂掉 会采用反客为主的形式，主上了以后变成从



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_142.png)

## 8.5 jedis java使用集群

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_143.png)

## 8.6 优点和缺点

### 优点

实现扩容。

分摊压力。

无中心配置相对简单。

### 缺点

多键操作是不被支持的，

多键的 Redis 事务是不被支持的。lua脚本不被支持

由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至 redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。

# 9 应用问题解决

## 9.1 缓存穿透（黑客攻击，key不存在）

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_144.png)

—个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动与的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。

### 解决方案

1. 对空值缓存：如果—个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟
2. 设置可访问的名单（白名单：

使用 bitmaps 类型定义一个可以访问的名单，名单 ia 作为 bitmaps 的偏移量， 每次访问和 bitmap 里面的 id进行比较，如果访问 id 不在 bitmaps 里面，进行拦截，不允许访问。

缺点：效率低

1. 采用布隆过滤器：(布隆过滤器（Bloom Filter）是 1970 年由布隆提出的。其实就是设置白名单，对白名单做了优化效率更高，

缺点： 但是命中率低了

1.  **进行实时监控**：当发现 Redis 的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务。

## 9.2 缓存击穿 （热门key过期）

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_145.png)

key 对应的数据存在，但在 redis 中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端 DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端 DB 压垮。

### 解决方案


💡 key 可能会在某些时间点被超高并发地访问，是一种非常“热点〞的数据。这个时候，需要考虑—个问题：缓存被“步穿〞的问题。



1. 永不过期策略：对于热点数据，设置较长的缓存过期时间，或使用定时更新的方式来主动刷新缓存。
2. 使用锁：，

（1）就是在缓存失效的时候（判断拿出来的值为空），不是立即去 load db。•

（2）先使用缓存工具的某些带成功操作返回值的操作（比如 Redis 的 SETNX去 set 一个 mutex key

（3）当操作返回成功时，再进行 load db 的操作，井回设缓存，最后删除 mutexkey；

  (4）当操作返回失败，证明有线程在 load db，当前线程睡眠一段时间再重试整个 get缓存的方法。

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_146.png)

## 9.3 缓存雪崩（批量key过期）

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_147.png)

### 解决方案

缓存失效时的雪崩效应对底层系统的冲击非常可怕！

1. 构建多级缓存架构：nginx缓存 + redis 缓存 +其他缓存( ehcache等）
2. 使用锁或队列：
    用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况

3.  将缓存失效时间分散开，设置不同的过期时间：
    比如我们可以在原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这样每—个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。
    

# 10 分布式锁

## 10.1 了解 redis 分布式锁

随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，单纯的 JaVa API并不能提供分布式锁的能力。为了解决这个问题就需要—种跨JVM的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题！

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_148.png)

分布式锁主流的实现方案：

1。基于数据库实现分布式锁

2。基于缓存（Redis等）

3。基于 Zookeeper。

每一种分布式锁解决方案都有各自的优缺点

1。 性能：redis 最高。

2。 可靠性：Zookeeper 最高。

## 10.2 redis 使用分布式锁

redis:命令：

```java
set key1 "value1" NX PX 10000
```

**EX second:设置键的过期时间为 second 秒.SET key value EX second 效果等同于 SETEX key second value**

**PX milisecond:设置键的过期时间为 milisecond 毫秒.SET key value Px millisecond 效果等同于 PSETEX key millisecond value**

**NX:只在键不存在时,才对键进行设置操作.SET key value NX 效果等同于 SETNX key value**

**XX:只在键已经存在时,才对键进行设置操作**.

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_149.png)

为了确保分布式锁可用，我们至少要确保锁的实现同时满足以下四个条件：

1.  互斥性。在任意时刻，只有一个客户端能持有锁。，
2. 不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。。
3. 解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了。
4. 加锁和解锁必须具有原子性。

### 10.2.2 问题1 死锁：锁上了服务器挂了没删除锁


💡 锁上了，但是服务挂了没设置成锁的时间



![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_150.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_151.png)

### jedis java代码

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_152.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_153.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_154.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_155.png)

测试num是1000 没问题

### 10.2.3 问题2 删错锁：uuid防误删

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_156.png)

### 改造代码

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_157.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_158.png)

### 10.2.4 问题3 删除锁原子性：使用lua脚本

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_159.png)

LUA脚本是类似 redis 事务，有一定的原子性，不会被其他命令插队，可以完成一些 redis 事务性的操作。

但是注意 redis 的 lua 脚本功能，只有在 Redis 2.6 以上的版本才可以使用。+

利用 lua脚本淘汰用户，解决超卖问题。

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_160.png)

![Untitled]( Redis6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%B0%9A%E7%A1%85%E8%B0%B7/Untitled_161.png)

# 11 redis6新功能

## ACL

### 简介。

Redis ACL是 Access Control List(访问控制列表）的缩写，该功能允许根据可以执行的命令和可以访问的键来限制某些连接。

在 Redis 5版本之前，Redis 安全规则只有密码控制还有通过 rename 来调整高危命令比如 flushdb， KEYS*， shutdown 等。Redis 6则提供 ACL 的功能对用户进行更细粒度的权限控制：

(1）接入权限：用户名和密码，

（2）可以执行的命令+

（3）可以操作的 KEY•

参考官网：https://redis.io/topics/acl

| 命令 | 描述 |
| --- | --- |
| acl list |  展现用户权限列表 on off是否启用 nopass 是否使用密码 ，再后面表示能操作那些key |
| acl cat |  操作命令有哪些 |
|  acl cat string | 具体操作命令有哪些 |
| acl setuser user1 |  添加用户 |
| acl whoami |  当前用户 |
| acl setuser user2 on >password >cached:* +get  |  添加user2用户有密码能操作 key是cached开头 的get命令 |
| auth user2 password | 切换用户 |

## io多线程


💡 单线程 +多路io复用



Redis6 终于支撑多线程了，告别单线程了吗？ 

IO多线程其实指客户端交互部分的网络 IO 交互处理模块多线程，而非执行命令多线程。Redis6 执行命令依然是单线程。

另外,多线程 IO默认也是不开启的,需要再配置文件中配置.

io-threads-do-reads yes 

io-threads 4

## 工具支持cluster

之前老版 Redis 想要搭集群需要单独安装 ruby 环境IRedis 5 将 redis-trib。rb 的功能集成到 redis-cli。另外官方 redis-benchmark 工具开始支持 cluster 模式了，通过多线程的方式对多个分片进行压测。
