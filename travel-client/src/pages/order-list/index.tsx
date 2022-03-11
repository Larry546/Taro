import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import { IOrderListState, IOrderTime } from "./interface";
import { getOrderList, getOrderTicket } from "../../api";
import { IOrderInfo } from "../order-detail/interface";
import { IOrderTicketInfo } from "../booking/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单列表",
});

export default class Index extends PureComponent<any> {
    orderIndex: number;
    state: IOrderListState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            orderList: [],
        };
        this.orderIndex = this.getParams();
        this.getList();
    }

    getParams = () => {
        const instance: any = this.instance;
        const data = instance.router.params;
        return data.orderIndex;
    };

    getList = async () => {
        let response = await getOrderList(this, this.orderIndex);
        let res = response;
        let orderList: Array<IOrderTime> = [];
        for (let item of res) {
            item.orderCreatetime = item.orderCreatetime.slice(0, 10);
            let index = orderList.findIndex(subitem => {
                return subitem.orderCreatetime === item.orderCreatetime;
            });
            let orderticket: Array<IOrderTicketInfo> = [];
            let ticketList = await getOrderTicket(this, item.orderId);
            ticketList.map(ticket => {
                let tindex = orderticket.findIndex(st => {
                    return st.ticketId == ticket.ticketId;
                });
                if (typeof tindex === "undefined" || tindex === -1) {
                    orderticket.push({
                        ticketNum: 1,
                        passenger: [ticket.passengerId],
                        ...ticket,
                    });
                } else {
                    orderticket[tindex].ticketNum++;
                    orderticket[tindex].passenger?.push(ticket.passengerId);
                }
            });
            let orderinfo: IOrderInfo = {
                ...item,
                orderTicket: orderticket,
            };
            if (typeof index === "undefined" || index === -1) {
                orderList.push({
                    orderCreatetime: orderinfo.orderCreatetime,
                    list: [orderinfo],
                });
            } else {
                orderList[index].list.push(orderinfo);
            }
        }
        this.setState({
            orderList: orderList,
        });
    };

    goToDetail = order => {
        this.push(`/pages/order-detail/index?orderId=${order.orderId}&spotId=${order.spotId}`);
    };

    render() {
        const { orderList } = this.state;
        return (
            <View className="orderlist">
                <H5NavBar title={"订单列表"} />
                <ScrollView scrollY className="orderlist_wrap" style={{ top: this.top }}>
                    {orderList && orderList.length ? (
                        <View className="orderlist_order_wrap">
                            <View>
                                {orderList.map((item, index) => {
                                    return (
                                        <View className="orderlist_order" key={index}>
                                            <View className="orderlist_order_tag">
                                                <Text>
                                                    预定日期：
                                                    {item.orderCreatetime.slice(5, 10)}
                                                </Text>
                                            </View>
                                            {item.list.map((subitem, subindex) => {
                                                return (
                                                    <View
                                                        className="orderlist_order_info orderlist_order_box"
                                                        key={subindex}
                                                    >
                                                        <View className="orderlist_order_info_wrap orderlist_order_box_wrap">
                                                            <View
                                                                className="orderlist_order_info_text"
                                                                onClick={() =>
                                                                    this.goToDetail(subitem)
                                                                }
                                                            >
                                                                <View className="orderlist_order_info_text_left">
                                                                    {subitem.orderTicket &&
                                                                        subitem.orderTicket.map(
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
                                                                <View
                                                                    className="orderlist_order_info_button_it"
                                                                    onClick={() =>
                                                                        this.goToDetail(subitem)
                                                                    }
                                                                >
                                                                    查看详情
                                                                </View>
                                                                <View
                                                                    className="orderlist_order_info_button_it orderlist_order_info_button_pay"
                                                                    onClick={() => {}}
                                                                >
                                                                    去支付
                                                                </View>
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
