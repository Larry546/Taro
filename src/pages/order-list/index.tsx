import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtList, AtNavBar } from "taro-ui";
import getEnv from "../../system/tools/environment";
import { IOrderInfo } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单列表",
});

export default class Index extends PureComponent<any> {
    orderList: Array<IOrderInfo>;
    constructor(props: any) {
        super(props);
        this.orderList = [
            {
                orderId: 1,
                orderName: "绍兴柯岩风景区门票绍兴柯岩风景区门票",
                orderTotal: 115,
                orderStatus: "待支付",
                orderCreateTime: "2022-03-03",
                orderuseTime: "2022-03-31",
            },
            {
                orderId: 1,
                orderName: "绍兴柯岩风景区门票",
                orderTotal: 115,
                orderStatus: "待支付",
                orderCreateTime: "2022-03-03",
                orderuseTime: "2022-03-31",
            },
        ];
    }
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
            <View className="orderlist">
                {getEnv() === "H5" ? (
                    <View className="orderlist_h5NavBar">
                        <AtNavBar
                            fixed={true}
                            border={false}
                            title={"订单列表"}
                            onClickLeftIcon={this.pop}
                            leftIconType={{ value: "left", prefixClass: "icon", color: "#000000" }}
                        ></AtNavBar>
                    </View>
                ) : null}
                {this.orderList.length ? (
                    <View>
                        <View>
                            {this.orderList.map((item, value) => {
                                // todo
                                return (
                                    <View>
                                        <Text>{item.orderName}</Text>
                                    </View>
                                );
                            })}
                        </View>

                        <View className="orderlist_end" style={{ height: "50px" }}>
                            <Text>没有更多了</Text>
                        </View>
                    </View>
                ) : (
                    <View className="orderlist_end">
                        <Text>没有订单</Text>
                    </View>
                )}
            </View>
        );
    }
}
