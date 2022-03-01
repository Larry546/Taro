import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "个人主页",
});

export default class Index extends PureComponent<any> {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    goToIndex = () => {
        this.push("/pages/index/index");
    };

    render() {
        return (
            <View className="index">
                <Text>个人主页</Text>
                <AtButton type="primary" circle={true} onClick={this.goToIndex}>
                    去首页
                </AtButton>
            </View>
        );
    }
}
