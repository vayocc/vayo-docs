* aotClasses：将Java类编译为AOT（Ahead-of-Time）编译的类文件，用于提高应用程序的启动性能。
* aotTestClasses：将测试类编译为AOT编译的类文件。
* assemble：构建项目的所有构建产物，包括JAR文件、WAR文件等。
* bootBuildImage：使用GraalVM构建Spring Boot应用程序的本地镜像。
* bootJar：构建可执行的Spring Boot JAR文件。
* build：执行项目的完整构建过程，包括编译、测试、打包等。
* buildDependents：构建所有依赖于该项目的项目。
* buildNeeded：构建项目及其所有直接和间接依赖项。
* classes：编译Java源代码生成类文件。
* clean：清理项目的构建产物和临时文件。
* collectReachabilityMetadata：收集Java代码的可达性元数据，用于进行Java对象的垃圾回收分析。
* jar：构建JAR文件。
* metadataCopy：复制元数据文件到输出目录。
* nativeCompile：编译本地代码。
* nativeRun：运行本地代码。
* nativeTestCompile：编译本地测试代码。
* testClasses：编译测试类生成测试类文件。
* resolveMainClassName：解析主类名。
* resolveTestMainClassName：解析测试主类名。
