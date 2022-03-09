package com.lhn.travel.util;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;

import java.util.Collections;

public class CodeGenerator {
    public static void main(String[] agrs) {
        generate();
    }

    private static void generate() {
        String[] tables = {"t_user", "t_passenger", "t_spot", "t_ticket", "t_order", "t_orderdetail", "t_comment"};
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/travel", "root", "123456")
                .globalConfig(builder -> {
                    builder.author("lhn") // 设置作者
//                            .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir("D:\\IdeaProjects\\travel\\src\\main\\java\\"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.lhn.travel") // 设置父包名
                            .moduleName(null) // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D:\\IdeaProjects\\travel\\src\\main\\resources\\mapper\\")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.entityBuilder().enableLombok();
                    builder.mapperBuilder().enableMapperAnnotation().build();
                    builder.controllerBuilder().enableHyphenStyle()
                            .enableRestStyle();
                    builder.addInclude(tables) // 设置需要生成的表名
                            .addTablePrefix("t_"); // 设置过滤表前缀
                })
//                .templateEngine(new VelocityTemplateEngine()) // 默认的是Velocity引擎模板
                .execute();
    }

}
