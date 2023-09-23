使用Maven打包时，总是会出现警 ：
[WARNING] 'dependencies.dependency.systemPath' for...

 > 转载：https://blog.csdn.net/ththcc/article/details/88748161

### 1. 描述

使用Maven打包时，总是会出现警告，原因是我引用了本地lib包导致。

```java
D:\workspace\f>mvn package
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.hgc:f2_maven:war:0.0.1-SNAPSHOT
[WARNING] 'dependencies.dependency.systemPath' for org.jbarcode:jbarcode-0.2.8:jar should not point at files within the project di
rectory, ${basedir}/web/WEB-INF/lib/jbarcode-0.2.8.jar will be unresolvable by dependent projects @ line 886, column 16
[WARNING] 'dependencies.dependency.systemPath' for com.hgc.provisioning:ProvisioningClient:jar should not point at files within th
e project directory, ${basedir}/web/WEB-INF/lib/ProvisioningClient.jar will be unresolvable by dependent projects @ line 893, colu
mn 16
[WARNING] 'dependencies.dependency.systemPath' for org.objectweb.rmijdbc:RmiJdbc:jar should not point at files within the project
directory, ${basedir}/web/WEB-INF/lib/RmiJdbc.jar will be unresolvable by dependent projects @ line 900, column 16
[WARNING] 'dependencies.dependency.systemPath' for com.lowagie:itextasian:jar should not point at files within the project directo
ry, ${basedir}/${lib.dir}/itextasian-1.0.jar will be unresolvable by dependent projects @ line 907, column 16
[WARNING]
```

```java
<dependency>
			<groupId>org.jbarcode</groupId>
			<artifactId>jbarcode-0.2.8</artifactId>
			<version>0.2.8</version>
			<scope>system</scope>
			<systemPath>${pom.basedir}/web/WEB-INF/lib/jbarcode-0.2.8.jar</systemPath>
		</dependency>
```

### 2. 分析

systemPath被设计用来讲一些系统库包含进来，它们往往具有固定的路径。当在自己的project中使用这个特性但是指定相对路径如${basedir}/src/lib之类的，就会提示这个。通过网络搜索，发现解决的方案还是有的。

### 3. 解决方法

方式一、将basedir修改为pom.basedir 推荐使用方式一，简单方便代码不多。

```java
<dependency>
			<groupId>org.jbarcode</groupId>
			<artifactId>jbarcode-0.2.8</artifactId>
			<version>0.2.8</version>
			<scope>system</scope>
			<systemPath>${pom.basedir}/web/WEB-INF/lib/jbarcode-0.2.8.jar</systemPath>
		</dependency>
```

更改后，警告消失：

```java
D:\workspace\f>mvn package
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building f2_maven 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- maven-svn-revision-number-plugin:1.7:revision (default) @ f2_maven ---
[INFO] inspecting D:\workspace\f
[INFO]   prefix = prefix
[INFO]   depth = empty
[INFO]   report unversioned = true
[INFO]   report ignored = false
[INFO]   report out-of-date = false
[INFO]  collecting status information
[INFO]         7213   7213 D:\workspace\f
[INFO]  setting properties
[INFO]   prefix.repository =
[INFO]   prefix.path =
[INFO]   prefix.revision = 7213
[INFO]   prefix.mixedRevisions = false
[INFO]   prefix.committedRevision = 7213
[INFO]   prefix.committedDate = 2019-03-19 18:00:51 +0800 (Tue, 19 Mar 2019)
[INFO]   prefix.status =
[INFO]   prefix.specialStatus =
[INFO]
[INFO] --- maven-clean-plugin:2.3:clean (auto-clean) @ f2_maven ---
[INFO] Deleting file set: D:\workspace\f\target (included: [**], excluded: [])
[INFO]
[INFO] --- build-helper-maven-plugin:1.8:add-resource (add-resource) @ f2_maven ---
[INFO]
[INFO] --- build-helper-maven-plugin:1.8:add-source (add-source) @ f2_maven ---
[INFO] Source directory: D:\workspace\f\src\base\java added.
[INFO] Source directory: D:\workspace\f\src\pcfault\java added.
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ f2_maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 1 resource
[INFO] Copying 6 resources
[INFO] Copying 1 resource
[INFO] Copying 8 resources
[INFO] Copying 10 resources
[INFO] Copying 7 resources
[INFO] Copying 3 resources
[INFO]
[INFO] --- maven-compiler-plugin:2.3.2:compile (default-compile) @ f2_maven ---
[INFO] Compiling 3467 source files to D:\workspace\f\target\classes
[INFO]
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ f2_maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory D:\workspace\f\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:2.3.2:testCompile (default-testCompile) @ f2_maven ---
[INFO] No sources to compile
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ f2_maven ---
[INFO] No tests to run.
[INFO]
[INFO] --- maven-war-plugin:2.3:war (default-war) @ f2_maven ---
[INFO] Packaging webapp
[INFO] Assembling webapp [f2_maven] in [D:\workspace\f\target\f2_maven]
[INFO] Processing war project
[INFO] Copying webapp webResources [D:\workspace\f\web/] to [D:\workspace\f\target\f2_maven]
[INFO] Copying webapp webResources [D:\workspace\f\src/main/resources] to [D:\workspace\f\target\f2_maven]
[INFO] Webapp assembled in [184335 msecs]
[INFO] Building war: D:\workspace\f\target\f2_maven.war
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 07:07 min
[INFO] Finished at: 2019-03-22T18:32:03+08:00
[INFO] Final Memory: 59M/1402M
[INFO] ------------------------------------------------------------------------

D:\workspace\f>
```

方式二、安装到仓库中

如下所示：

```java
<dependency>
			<groupId>org.jbarcode</groupId>
			<artifactId>jbarcode</artifactId>
			<version>0.2.8</version>
		</dependency>
```

```java
<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-install-plugin</artifactId>
				<version>2.5.2</version>
				<executions>
					<execution>
						<id>install-external</id>
						<phase>clean</phase>
						<configuration>
							<file>${basedir}/web/WEB-INF/lib/jbarcode-0.2.8.jar</file>
							<repositoryLayout>default</repositoryLayout>
							<groupId>org.jbarcode</groupId>
							<artifactId>jbarcode</artifactId>
							<version>0.2.8</version>
							<generatePom>true</generatePom>
						</configuration>
						<goals>
							<goal>install-file</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
```

