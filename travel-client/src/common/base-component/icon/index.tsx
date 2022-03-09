import React from "react";
import { Text } from "@tarojs/components";

//https://www.iconfont.cn/
const Icon = props => {
    const { type, size, color } = props;

    return <Text className={`icon icon-${type}`} style={{ color, fontSize: `${size}px` }} />;
};

export default Icon;
