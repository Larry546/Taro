import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户注册",
});

export default class Index extends PureComponent<any> {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className="index">
                <Text>用户注册页</Text>
            </View>
        );
    }
}
