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

    goToLogin = () => {
        this.push("/pages/user-login/index");
    };

    render() {
        return (
            <View className="index">
                <Text>个人主页</Text>
                <AtButton type="secondary" size={"normal"} onClick={this.goToLogin}>
                    登陆
                </AtButton>
                <AtButton type="secondary" size={"normal"}>
                    退出登陆
                </AtButton>
            </View>
        );
    }
}
