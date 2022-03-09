import PureComponent from "../../common/pure-component";
import getEnv from "../../system/tools/environment";
import { View, Text, ScrollView } from "@tarojs/components";
import H5NavBar from "../../common/h5NavBar";
import { IOrderDetailState } from "./interface";
import { IPassengerInfo } from "../../common/traveler/edit/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单详情",
});

export default class Index extends PureComponent<any> {
    state: IOrderDetailState;
    infoTop: number;
    constructor(props: any) {
        super(props);
        this.infoTop = getEnv() === "H5" ? 95 : 0;
        this.state = {
            passengerlist: [
                {
                    passengerId: 1,
                    passengerName: "啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈",
                    passengerNumber:
                        "123456123456123456123456123456123456123456123456123456123456123456123456123456123456",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 2,
                    passengerName: "哈哈1",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 3,
                    passengerName: "哈2哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 4,
                    passengerName: "哈哈3",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 5,
                    passengerName: "哈4哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 6,
                    passengerName: "哈rr哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 7,
                    passengerName: "哈ss哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 8,
                    passengerName: "哈xx哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 9,
                    passengerName: "哈aa哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 10,
                    passengerName: "哈gg哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
            ],
            orderInfo: {
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
                        ticketNum: 1,
                        ticketPrice: 99,
                        passenger: [1],
                    },
                    {
                        ticketId: 2,
                        ticketName: "儿童票",
                        ticketNum: 1,
                        ticketPrice: 44,
                        passenger: [1],
                    },
                ],
            },
            spotInfo: {
                spotId: 1,
                spotName: "绍兴柯岩风景区",
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
                spotOpenhour: "8:00",
                spotOffhour: "16:00",
            },
        };
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    getPass = id => {
        const { passengerlist } = this.state;
        let pass: IPassengerInfo = {
            passengerName: "",
            passengerNumber: "",
        };
        passengerlist.forEach(item => {
            if (item.passengerId == id) {
                pass = item;
            }
        });
        return pass;
    };

    render() {
        const { orderInfo, spotInfo } = this.state;
        return (
            <View className="orderdetail">
                <H5NavBar />
                <ScrollView scrollY className="orderdetail_info" style={{ top: this.infoTop }}>
                    <View className="orderdetail_info_wrap">
                        <View className="orderdetail_info_header">
                            <View className="orderdetail_info_header_status">
                                <Text>{orderInfo.orderStatus}</Text>
                            </View>
                            <View className="orderdetail_info_header_desc">
                                <Text>很抱歉，由于订单超时未支付已自动取消，建议您再次预订</Text>
                            </View>
                        </View>
                        <View className="orderdetail_info_total orderdetail_info_box">
                            <View className="orderdetail_info_box_wrap">
                                <View className="orderdetail_info_total_id">
                                    <Text>订单号：{orderInfo.orderId}</Text>
                                </View>
                                <View className="orderdetail_info_total_price">
                                    <Text>在线支付 </Text>
                                    <Text style={{ color: "#ff6600" }}>
                                        ￥{orderInfo.orderTotal}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="orderdetail_info_box">
                            <View className="orderdetail_info_box_wrap">
                                {orderInfo.orderTicket.map((item, index) => {
                                    return (
                                        <View className="orderdetail_info_ticket" key={index}>
                                            <View className="orderdetail_info_ticket_name">
                                                <Text>
                                                    {orderInfo.orderSpotname + item.ticketName}x
                                                    {item.ticketNum}份
                                                </Text>
                                            </View>
                                            <View className="orderdetail_info_ticket_useday">
                                                <Text style={{ color: "#999999" }}>
                                                    使用日期{"    "}
                                                </Text>
                                                <Text style={{ color: "#ff7700" }}>
                                                    {orderInfo.orderUsetime}
                                                </Text>
                                            </View>
                                            {item.passenger?.map((passid, pindex) => {
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
                                                                <Text
                                                                    className={
                                                                        "orderdetail_info_ticket_passenger_info_webkit"
                                                                    }
                                                                >
                                                                    {
                                                                        this.getPass(passid)
                                                                            .passengerName
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    className={
                                                                        "orderdetail_info_ticket_passenger_info_webkit"
                                                                    }
                                                                >
                                                                    证件号：
                                                                    {
                                                                        this.getPass(passid)
                                                                            .passengerNumber
                                                                    }
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
                            <View className="orderdetail_info_box_wrap" onClick={() => {}}>
                                <View className="orderdetail_info_spot">
                                    <View className="orderdetail_info_spot_name">
                                        <Text>{spotInfo.spotName}</Text>
                                    </View>
                                    <View className="orderdetail_info_spot_other">
                                        <Text>地址: {spotInfo.spotAddress}</Text>
                                        <Text>
                                            开放时间: {spotInfo.spotOpenhour}-{spotInfo.spotOffhour}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="orderdetail_footer">
                    <View className="orderdetail_footer_buttons">
                        <View className="orderdetail_footer_button" onClick={() => {}}>
                            <Text>删除订单</Text>
                        </View>
                        <View className="orderdetail_footer_button" onClick={() => {}}>
                            <Text>再次预定</Text>
                        </View>
                        <View className="orderdetail_footer_button" onClick={() => {}}>
                            <Text>评论</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
