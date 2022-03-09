import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtButton } from "taro-ui";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import { IOrderListState } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单列表",
});

export default class Index extends PureComponent<any> {
    state: IOrderListState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            orderList: [
                {
                    orderCreatetime: "2022-03-03",
                    list: [
                        {
                            orderId: 1,
                            orderSpotname: "绍兴柯岩风景区门票绍兴柯岩风景区门票",
                            orderTotal: 115,
                            orderStatus: "待支付",
                            orderCreatetime: "2022-03-03",
                            orderUsetime: "2022-03-31",
                            orderTicket: [
                                {
                                    ticketId: 1,
                                    ticketName: "成人票",
                                    ticketPrice: 99,
                                    ticketNum: 1,
                                },
                                {
                                    ticketId: 2,
                                    ticketName: "儿童票",
                                    ticketPrice: 44,
                                    ticketNum: 1,
                                },
                            ],
                        },
                        {
                            orderId: 1,
                            orderSpotname: "绍兴柯岩风景区门票",
                            orderTotal: 115,
                            orderStatus: "待支付",
                            orderCreatetime: "2022-03-03",
                            orderUsetime: "2022-03-31",
                            orderTicket: [
                                {
                                    ticketId: 1,
                                    ticketName: "成人票",
                                    ticketPrice: 99,
                                    ticketNum: 2,
                                },
                            ],
                        },
                    ],
                },
                {
                    orderCreatetime: "2022-03-04",
                    list: [
                        {
                            orderId: 1,
                            orderSpotname: "绍兴柯岩风景区门票绍兴柯岩风景区门票",
                            orderTotal: 115,
                            orderStatus: "待支付",
                            orderCreatetime: "2022-03-04",
                            orderUsetime: "2022-03-31",
                            orderTicket: [
                                {
                                    ticketId: 2,
                                    ticketName: "儿童票",
                                    ticketPrice: 44,
                                    ticketNum: 1,
                                },
                            ],
                        },
                    ],
                },
            ],
        };
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
        const { orderList } = this.state;
        return (
            <View className="orderlist">
                <H5NavBar title={"订单列表"} />
                <ScrollView scrollY className="orderlist_wrap" style={{ top: this.top }}>
                    {orderList.length ? (
                        <View className="orderlist_order_wrap">
                            <View>
                                {orderList.map((item, index) => {
                                    // todo
                                    return (
                                        <View className="orderlist_order" key={index}>
                                            <View className="orderlist_order_tag">
                                                <Text>
                                                    预定日期：{item.orderCreatetime.slice(5, 10)}
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
                                                                                            {subitem.orderSpotname +
                                                                                                titem.ticketName}
                                                                                        </Text>
                                                                                    </View>
                                                                                    <View className="orderlist_order_info_text_left_other">
                                                                                        <Text>
                                                                                            {subitem.orderUsetime.slice(
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
                                                                    onClick={() => {}}
                                                                >
                                                                    查看详情
                                                                </AtButton>
                                                                <AtButton
                                                                    className="orderlist_order_info_button_it"
                                                                    size="small"
                                                                    onClick={() => {}}
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
