import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户登录",
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
                <Text>用户登录页</Text>
            </View>
        );
    }
}
