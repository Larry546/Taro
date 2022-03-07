import PureComponent from "../../common/pure-component";
import getEnv from "../../system/tools/environment";
import { View, Text, ScrollView } from "@tarojs/components";
import H5NavBar from "../../common/h5NavBar";
import { IOrderInfo } from "./interface";
import { ISpotInfo } from "../spot-detail/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单详情",
});

export default class Index extends PureComponent<any> {
    orderInfo: IOrderInfo;
    spotInfo: ISpotInfo;
    infoTop: number;
    constructor(props: any) {
        super(props);
        this.infoTop = getEnv() === "H5" ? 95 : 0;
        this.orderInfo = {
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
                    ticketPassenger: [
                        {
                            passengerId: 1,
                            passengerName: "小明",
                            passengerNumber: "123456789",
                        },
                    ],
                },
                {
                    ticketId: 2,
                    ticketName: "儿童票",
                    ticketNum: 1,
                    ticketPassenger: [
                        {
                            passengerId: 1,
                            passengerName: "小明的撒",
                            passengerNumber: "123456789",
                        },
                    ],
                },
            ],
        };
        this.spotInfo = {
            spotId: 1,
            spotName: "绍兴柯岩风景区",
            spotCity: "绍兴",
            spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
            spotOpenhour: "8:00",
            spotOffhour: "16:00",
        };
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className="orderdetail">
                <H5NavBar />
                <ScrollView className="orderdetail_info" style={{ top: this.infoTop }}>
                    <View className="orderdetail_info_wrap">
                        <View className="orderdetail_info_header">
                            <View className="orderdetail_info_header_status">
                                <Text>{this.orderInfo.orderStatus}</Text>
                            </View>
                            <View className="orderdetail_info_header_desc">
                                <Text>很抱歉，由于订单超时未支付已自动取消，建议您再次预订</Text>
                            </View>
                        </View>
                        <View className="orderdetail_info_total orderdetail_info_box">
                            <View className="orderdetail_info_box_wrap">
                                <View className="orderdetail_info_total_id">
                                    <Text>订单号：{this.orderInfo.orderId}</Text>
                                </View>
                                <View className="orderdetail_info_total_price">
                                    <Text>在线支付 </Text>
                                    <Text style={{ color: "#ff6600" }}>
                                        ￥{this.orderInfo.orderTotal}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="orderdetail_info_box">
                            <View className="orderdetail_info_box_wrap">
                                {this.orderInfo.orderTicket.map((item, index) => {
                                    return (
                                        <View className="orderdetail_info_ticket" key={index}>
                                            <View className="orderdetail_info_ticket_name">
                                                <Text>
                                                    {this.orderInfo.orderName + item.ticketName}x
                                                    {item.ticketNum}份
                                                </Text>
                                            </View>
                                            <View className="orderdetail_info_ticket_useday">
                                                <Text style={{ color: "#999999" }}>
                                                    使用日期{"    "}
                                                </Text>
                                                <Text style={{ color: "#ff7700" }}>
                                                    {this.orderInfo.orderuseTime}
                                                </Text>
                                            </View>
                                            {item.ticketPassenger?.map((pass, pindex) => {
                                                return (
                                                    <View
                                                        className="orderdetail_info_ticket_passenger"
                                                        key={pindex}
                                                    >
                                                        <View className="orderdetail_info_ticket_passenger_wrap">
                                                            <View className="orderdetail_info_ticket_passenger_no">
                                                                <Text>
                                                                    {item.ticketName} {pindex + 1}
                                                                </Text>
                                                            </View>
                                                            <View
                                                                className={
                                                                    "orderdetail_info_ticket_passenger_info"
                                                                }
                                                            >
                                                                <Text>{pass.passengerName}</Text>
                                                                <Text>
                                                                    证件号：{pass.passengerNumber}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="orderdetail_info_box">
                            <View className="orderdetail_info_box_wrap">
                                <View className="orderdetail_info_spot">
                                    <View className="orderdetail_info_spot_name">
                                        <Text>{this.spotInfo.spotName}</Text>
                                    </View>
                                    <View className="orderdetail_info_spot_other">
                                        <Text>地址: {this.spotInfo.spotAddress}</Text>
                                        <Text>
                                            开放时间: {this.spotInfo.spotOpenhour}-
                                            {this.spotInfo.spotOffhour}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="orderdetail_footer">
                    <View className="orderdetail_footer_buttons">
                        <View className="orderdetail_footer_button">
                            <Text>删除订单</Text>
                        </View>
                        <View className="orderdetail_footer_button">
                            <Text>再次预定</Text>
                        </View>
                        <View className="orderdetail_footer_button">
                            <Text>评论</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
