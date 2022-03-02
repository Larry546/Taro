import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单填写",
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
                <Text>订单填写页</Text>
                <AtButton type="secondary" size={"normal"}>
                    提交订单
                </AtButton>
            </View>
        );
    }
}
