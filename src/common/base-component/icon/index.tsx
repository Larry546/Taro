import React from "react";
import { Text } from "@tarojs/components";
import "./icon.scss";

//https://www.iconfont.cn/
const Icon = props => {
    const { type, size, color } = props;

    return <Text className={`iconfont icon-${type}`} style={{ color, fontSize: `${size}px` }} />;
};

export default Icon;
