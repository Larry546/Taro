import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtButton, AtNavBar } from "taro-ui";
import getEnv from "../../system/tools/environment";
import { IOrderTime } from "../order-detail/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单列表",
});

export default class Index extends PureComponent<any> {
    orderList: Array<IOrderTime>;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.orderList = [
            {
                orderCreateTime: "2022-03-03",
                list: [
                    {
                        orderId: 1,
                        orderName: "绍兴柯岩风景区门票绍兴柯岩风景区门票",
                        orderTotal: 115,
                        orderStatus: "待支付",
                        orderCreateTime: "2022-03-03",
                        orderuseTime: "2022-03-31",
                        orderTicket: [
                            {
                                ticketId: 1,
                                ticketName: "成人票",
                                ticketNum: 1,
                            },
                            {
                                ticketId: 2,
                                ticketName: "儿童票",
                                ticketNum: 1,
                            },
                        ],
                    },
                    {
                        orderId: 1,
                        orderName: "绍兴柯岩风景区门票",
                        orderTotal: 115,
                        orderStatus: "待支付",
                        orderCreateTime: "2022-03-03",
                        orderuseTime: "2022-03-31",
                        orderTicket: [
                            {
                                ticketId: 1,
                                ticketName: "成人票",
                                ticketNum: 2,
                            },
                        ],
                    },
                ],
            },
            {
                orderCreateTime: "2022-03-04",
                list: [
                    {
                        orderId: 1,
                        orderName: "绍兴柯岩风景区门票绍兴柯岩风景区门票",
                        orderTotal: 115,
                        orderStatus: "待支付",
                        orderCreateTime: "2022-03-04",
                        orderuseTime: "2022-03-31",
                        orderTicket: [
                            {
                                ticketId: 2,
                                ticketName: "儿童票",
                                ticketNum: 1,
                            },
                        ],
                    },
                ],
            },
        ];
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    goToDetail = () => {
        this.push("/pages/order-detail/index");
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
                <ScrollView scrollY className="orderlist_wrap" style={{ top: this.top }}>
                    {this.orderList.length ? (
                        <View className="orderlist_order_wrap">
                            <View>
                                {this.orderList.map((item, index) => {
                                    // todo
                                    return (
                                        <View className="orderlist_order" key={index}>
                                            <View className="orderlist_order_tag">
                                                <Text>
                                                    预定日期：{item.orderCreateTime.slice(5, 10)}
                                                </Text>
                                            </View>
                                            {item.list.map((subitem, subindex) => {
                                                return (
                                                    <View
                                                        className="orderlist_order_info orderlist_order_box"
                                                        key={subindex}
                                                        onClick={this.goToDetail}
                                                    >
                                                        <View className="orderlist_order_info_wrap orderlist_order_box_wrap">
                                                            <View className="orderlist_order_info_text">
                                                                <View className="orderlist_order_info_text_left">
                                                                    {subitem.orderTicket.map(
                                                                        (titem, tindex) => {
                                                                            return (
                                                                                <View
                                                                                    className="orderlist_order_info_text_left_wrap"
                                                                                    key={tindex}
                                                                                >
                                                                                    <View className="orderlist_order_info_text_left_name">
                                                                                        <Text>
                                                                                            {subitem.orderName +
                                                                                                titem.ticketName}
                                                                                        </Text>
                                                                                    </View>
                                                                                    <View className="orderlist_order_info_text_left_other">
                                                                                        <Text>
                                                                                            {subitem.orderuseTime.slice(
                                                                                                5,
                                                                                                10
                                                                                            )}{" "}
                                                                                            有效
                                                                                            {"  " +
                                                                                                titem.ticketNum}
                                                                                            份
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            );
                                                                        }
                                                                    )}
                                                                </View>
                                                                <View className="orderlist_order_info_text_right">
                                                                    <View className="orderlist_order_info_text_right_total">
                                                                        <Text>
                                                                            ￥{subitem.orderTotal}
                                                                        </Text>
                                                                    </View>
                                                                    <View className="orderlist_order_info_text_right_status">
                                                                        <Text>
                                                                            {subitem.orderStatus}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View className="orderlist_order_info_button">
                                                                <AtButton
                                                                    className="orderlist_order_info_button_it"
                                                                    size="small"
                                                                >
                                                                    ssssssssssss
                                                                </AtButton>
                                                                <AtButton
                                                                    className="orderlist_order_info_button_it"
                                                                    size="small"
                                                                >
                                                                    sss2
                                                                </AtButton>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    );
                                })}
                            </View>

                            <View className="orderlist_end" style={{ height: "30px" }}>
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
