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

    showToast = () => {
        this.toast.show("this is a toast");
    };

    render() {
        return (
            <View className="index">
                <Text>个人主页</Text>
                <AtButton type="primary" circle={true}>
                    去首页
                </AtButton>
            </View>
        );
    }
}
