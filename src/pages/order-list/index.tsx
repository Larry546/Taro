import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单列表",
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
                <Text>订单列表页</Text>
            </View>
        );
    }
}
