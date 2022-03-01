import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "首页",
});

export default class Index extends PureComponent<any> {
    componentWillMount() {
        // this.http.get("/user/list");
        console.log("instance", this.instance);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    goToUser = () => {
        this.push("/pages/user/index");
    };

    showToast = () => {
        this.toast.show("this is a toast");
    };

    showConfirm = () => {
        this.confirm.show({
            title: "confirm",
            content: "this is a confirm",
        });
    };

    render() {
        return (
            <View className="index">
                <Text>Hello world!</Text>
                <AtButton type="primary" onClick={this.showToast}>
                    showToast
                </AtButton>
                <AtButton type="primary" onClick={this.showConfirm}>
                    showComfirm
                </AtButton>
                <AtButton type="primary" circle={true} onClick={this.goToUser}>
                    去个人主页
                </AtButton>
            </View>
        );
    }
}
