import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import httpRequest from "../../system/http";

import "taro-ui/dist/style/index.scss";
import "./index.scss";

definePageConfig({
    navigationBarTitleText: "首页",
});

export default class Index extends Component {
    componentWillMount() {
        httpRequest.get("/user/list");
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className="index">
                <Text>Hello world!</Text>
                <AtButton type="primary">I need Taro UI</AtButton>
                <AtButton type="primary" circle={true}>
                    支持
                </AtButton>
            </View>
        );
    }
}
