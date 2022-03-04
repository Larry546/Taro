import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtButton, AtNavBar } from "taro-ui";
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
                <ScrollView scrollY>
                    {this.orderList.length ? (
                        <View>
                            <View>
                                {this.orderList.map((item, index) => {
                                    // todo
                                    return (
                                        <View className="orderlist_order">
                                            <View className="orderlist_order_tag">
                                                <Text>
                                                    预定日期：{item.orderCreateTime.slice(5, 10)}
                                                </Text>
                                            </View>
                                            <View className="orderlist_order_info">
                                                <View className="orderlist_order_info_wrap">
                                                    <View className="orderlist_order_info_text">
                                                        <View className="orderlist_order_info_text_left">
                                                            <View className="orderlist_order_info_text_left_name">
                                                                <Text>{item.orderName}</Text>
                                                            </View>
                                                            <View className="orderlist_order_info_text_left_other">
                                                                <Text>
                                                                    {item.orderuseTime.slice(5, 10)}{" "}
                                                                    有效{"  "}1份
                                                                </Text>
                                                            </View>
                                                            <View className="orderlist_order_info_text_left_name">
                                                                <Text>{item.orderName}</Text>
                                                            </View>
                                                            <View className="orderlist_order_info_text_left_other">
                                                                <Text>
                                                                    {item.orderuseTime.slice(5, 10)}{" "}
                                                                    有效{"  "}1份
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        <View className="orderlist_order_info_text_right">
                                                            <View className="orderlist_order_info_text_right_total">
                                                                <Text>￥{item.orderTotal}</Text>
                                                            </View>
                                                            <View className="orderlist_order_info_text_right_status">
                                                                <Text>{item.orderStatus}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className="orderlist_order_info_button">
                                                        <AtButton size="small">sss1</AtButton>
                                                        <AtButton size="small">sss2</AtButton>
                                                    </View>
                                                </View>
                                            </View>
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
                </ScrollView>
            </View>
        );
    }
}
