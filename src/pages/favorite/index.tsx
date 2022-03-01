import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

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
                <Text>收藏</Text>
                <AtButton type="primary" circle={true}>
                    收藏页
                </AtButton>
            </View>
        );
    }
}
