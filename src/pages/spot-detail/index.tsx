import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "景点详情",
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
                <Text>景点详情页</Text>
            </View>
        );
    }
}
