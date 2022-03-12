import PureComponent from "../../common/pure-component";
import getEnv from "../../system/tools/environment";
import { View, Text, ScrollView } from "@tarojs/components";
import H5NavBar from "../../common/h5NavBar";
import { IOrderDetailState, IOrderInfo } from "./interface";
import { IPassengerInfo } from "../../common/traveler/edit/interface";
import { getPassengerList, getSpotInfo, getOrderInfo, getOrderTicket } from "../../api";
import { ISpotInfo } from "../spot-detail/interface";
import { IOrderTicketInfo } from "../booking/interface";
import { weekDay } from "../../system/tools/date";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单详情",
});

export default class Index extends PureComponent<any> {
    orderId: number;
    spotId: number;
    state: IOrderDetailState;
    infoTop: number;
    constructor(props: any) {
        super(props);
        this.infoTop = getEnv() === "H5" ? 95 : 0;
        this.state = {
            orderInfo: {
                orderId: 0,
                orderSpotname: "",
                orderTotal: 0,
                orderCreatetime: "",
                orderUsetime: "",
                orderStatus: "",
            },
        };
        this.init();
    }

    init = async () => {
        this.getParams();
        let passengerlist: Array<IPassengerInfo> = await getPassengerList(this);
        let spotInfo: ISpotInfo = await getSpotInfo(this, this.spotId);
        let order = await getOrderInfo(this, this.orderId);
        order.orderCreatetime = order.orderCreatetime.slice(0, 10);
        let orderticket: Array<IOrderTicketInfo> = [];
        let ticketList = await getOrderTicket(this, this.orderId);
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
        let orderInfo: IOrderInfo = {
            ...order,
            orderSpotname: spotInfo.spotName,
            orderTicket: orderticket,
        };
        this.setState({
            passengerlist: passengerlist,
            spotInfo: spotInfo,
            orderInfo: orderInfo,
        });
    };

    getParams = () => {
        const instance: any = this.instance;
        const data = instance.router.params;
        this.orderId = data.orderId;
        this.spotId = data.spotId;
    };

    getPass = id => {
        const { passengerlist } = this.state;
        let pass: IPassengerInfo = {
            passengerName: "",
            passengerNumber: "",
        };
        passengerlist &&
            passengerlist.forEach(item => {
                if (item.passengerId == id) {
                    pass = item;
                }
            });
        return pass;
    };

    goToDetail = () => {
        this.push(`/pages/spot-detail/index?spotId=${this.spotId}`);
    };

    goToComment = () => {
        this.push(`/pages/comment/index?spotId=${this.spotId}`);
    };

    render() {
        const { orderInfo, spotInfo } = this.state;
        return (
            <View className="orderdetail">
                <H5NavBar />
                <ScrollView scrollY className="orderdetail_info" style={{ top: this.infoTop }}>
                    {orderInfo && spotInfo ? (
                        <View className="orderdetail_info_wrap">
                            <View className="orderdetail_info_header">
                                <View className="orderdetail_info_header_status">
                                    <Text>{orderInfo.orderStatus}</Text>
                                </View>
                                <View className="orderdetail_info_header_desc">
                                    <Text>库存有限，请尽快完成付款</Text>
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
                                    {orderInfo.orderTicket &&
                                        orderInfo.orderTicket.map((item, index) => {
                                            return (
                                                <View
                                                    className="orderdetail_info_ticket"
                                                    key={index}
                                                >
                                                    <View className="orderdetail_info_ticket_name">
                                                        <Text>
                                                            {orderInfo.orderSpotname +
                                                                item.ticketName}
                                                            x{item.ticketNum}份
                                                        </Text>
                                                    </View>
                                                    <View className="orderdetail_info_ticket_useday">
                                                        <Text style={{ color: "#999999" }}>
                                                            使用日期{"    "}
                                                        </Text>
                                                        <Text style={{ color: "#ff7700" }}>
                                                            {orderInfo.orderUsetime} 星期
                                                            {weekDay(orderInfo.orderUsetime)}
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
                                                                            {item.ticketName}{" "}
                                                                            {pindex + 1}
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
                                                开放时间: {spotInfo.spotOpenhour}-
                                                {spotInfo.spotOffhour}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
                <View className="orderdetail_footer">
                    <View className="orderdetail_footer_buttons">
                        <View className="orderdetail_footer_button" onClick={() => {}}>
                            <Text>删除订单</Text>
                        </View>
                        <View className="orderdetail_footer_button" onClick={this.goToComment}>
                            <Text>点评景点</Text>
                        </View>
                        <View
                            className="orderdetail_footer_button orderdetail_footer_button_order"
                            onClick={this.goToDetail}
                        >
                            <Text>再次预定</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
