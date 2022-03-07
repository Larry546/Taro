import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtCalendar, AtFloatLayout, AtInput, AtInputNumber } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import getEnv from "../../system/tools/environment";
import Icon from "../../common/base-component/icon";
import Image from "../..//common/base-component/image";
import { ISpotInfo } from "../spot-detail/interface";
import { IBookingState } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单填写",
});

export default class Index extends PureComponent<any> {
    top: number;
    state: IBookingState;
    spotInfo: ISpotInfo;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.spotInfo = {
            spotId: 1,
            spotName: "绍兴柯岩风景区",
            spotCity: "绍兴",
            spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
            spotOpenhour: "8:00",
            spotOffhour: "16:00",
            spotRateScore: 4.5,
            spotRateNum: 996,
            spotType: ["游乐园", "自然风景"],
            ticketList: [
                {
                    ticketId: 1,
                    ticketName: "成人票",
                    ticketPrice: 99,
                    ticketRequest:
                        "1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上",
                    ticketTag: ["无需取票", "无忧退"],
                },
                {
                    ticketId: 2,
                    ticketName: "儿童票票",
                    ticketPrice: 44,
                    ticketRequest: "1.0米(含)-1.4米(含)1.0米(含)-1.4米(含)",
                    ticketTag: ["无需取票"],
                },
            ],
        };
        this.state = {
            calendarOpen: false,
            selectedDate: new Date().toLocaleDateString(),
            contact: "",
        };
        this.initTicketList();
        console.log(
            "🚀 ~ file: index.tsx ~ line 53 ~ Index ~ constructor ~ this.state",
            this.state
        );
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    initTicketList = () => {
        let list: any = [];
        this.spotInfo.ticketList?.map(item => {
            list.push({
                ticketId: item.ticketId,
                ticketName: item.ticketName,
                ticketPrice: item.ticketPrice,
                ticketNum: 0,
            });
        });

        this.state.orderTicketList = list;
    };

    onOpenCalendar = () => {
        this.setState({ calendarOpen: true });
    };

    onCloseCalendar = () => {
        this.setState({ calendarOpen: false });
    };

    onDayClick = res => {
        console.log("🚀 ~ file: index.tsx ~ line 70 ~ Index ~ res", res);
        this.setState({ selectedDate: res && res.value });
        this.onCloseCalendar();
    };

    onChangeContact = res => {
        console.log("🚀 ~ file: index.tsx ~ line 83 ~ Index ~ res", res);
        this.setState({ contact: res });
    };

    findTicket = id => {
        const { orderTicketList } = this.state;
        return orderTicketList?.find(item => item.ticketId === id);
    };

    changeTicketNum = (value, id) => {
        const { orderTicketList } = this.state;
        let index = orderTicketList?.findIndex(item => item.ticketId === id);
        if (typeof index != "undefined" && orderTicketList) {
            let newList = orderTicketList;
            let newItem = newList[index];
            newItem && (newItem.ticketNum = value);
            this.setState((preState: IBookingState) => {
                return {
                    ...preState,
                    orderTicketList: newList,
                };
            });
        }
    };

    render() {
        const { selectedDate, calendarOpen } = this.state;
        return (
            <View className="booking">
                <H5NavBar title={"订单填写"} />
                <ScrollView scrollY className="booking_info" style={{ top: this.top }}>
                    <View className="booking_info_spot">
                        <View className="booking_info_spot_title">
                            <Text>{this.spotInfo.spotName}</Text>
                        </View>
                        <View className="booking_info_spot_sku">
                            <View className="booking_info_spot_sku_line" />
                            <View className="booking_info_spot_sku_leftSpot" />
                            <View className="booking_info_spot_sku_rightSpot" />
                            <View className="booking_info_spot_sku_date">
                                <View className="booking_info_spot_sku_date_title">
                                    <Text>选择日期</Text>
                                </View>
                                <View
                                    className="booking_info_spot_sku_date_selector"
                                    onClick={this.onOpenCalendar}
                                >
                                    <Text>{selectedDate}</Text>
                                </View>
                                <AtFloatLayout isOpened={calendarOpen}>
                                    <AtCalendar
                                        format={"YYYY/MM/DD"}
                                        minDate={new Date().toLocaleDateString()}
                                        onDayClick={this.onDayClick}
                                    />
                                </AtFloatLayout>
                            </View>
                            <View className="booking_info_spot_sku_tickets">
                                {this.spotInfo.ticketList?.length &&
                                    this.spotInfo.ticketList.map((item, index) => {
                                        return (
                                            <View
                                                className="booking_info_spot_sku_ticket"
                                                key={index}
                                            >
                                                <View className="booking_info_spot_sku_ticket_fline">
                                                    <View className="booking_info_spot_sku_ticket_name">
                                                        <Text>{item.ticketName}</Text>
                                                    </View>
                                                    <View className="booking_info_spot_sku_ticket_right">
                                                        <View className="booking_info_spot_sku_ticket_right_price">
                                                            <Text>￥{item.ticketPrice}</Text>
                                                        </View>

                                                        <AtInputNumber
                                                            type="number"
                                                            value={
                                                                this.findTicket(item.ticketId)
                                                                    ?.ticketNum || 0
                                                            }
                                                            onChange={value =>
                                                                this.changeTicketNum(
                                                                    value,
                                                                    item.ticketId
                                                                )
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                                <View className="booking_info_spot_sku_ticket_sline">
                                                    <Text>
                                                        {item.ticketRequest &&
                                                            "适用人群：" + item.ticketRequest}
                                                    </Text>
                                                </View>
                                                <View className="booking_info_spot_sku_ticket_tline">
                                                    {item.ticketTag?.map((tag, index) => {
                                                        return (
                                                            <View
                                                                style={{
                                                                    color: "#0086f6",
                                                                }}
                                                                key={index}
                                                            >
                                                                <Text>{tag} </Text>
                                                                <Text style={{ color: "#666" }}>
                                                                    |{" "}
                                                                </Text>
                                                            </View>
                                                        );
                                                    })}
                                                    <View>
                                                        <Text style={{ color: "#F70" }}>官方</Text>
                                                        <Text> | 购买须知 </Text>
                                                        <Icon type={"right"} />
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </View>
                        </View>
                    </View>
                    <View className="booking_info_passenger">
                        <View className="booking_info_passenger_header">
                            <Text className="booking_info_passenger_header_title">出行信息</Text>
                            <View className="booking_info_passenger_header_append">
                                <Text>需选择</Text>
                                <Text style={{ color: "#f60" }}> 2 </Text>
                                <Text>位出行人</Text>
                            </View>
                        </View>
                        <View className="booking_info_passenger_contact">
                            <View className="booking_info_passenger_contact_title">
                                <Text>联系手机</Text>
                            </View>
                            <View className="booking_info_passenger_contact_input">
                                <AtInput
                                    placeholder={"用于生成订单"}
                                    name={"contact"}
                                    onChange={this.onChangeContact}
                                />
                            </View>
                        </View>
                    </View>
                    <Image
                        url={"https://dimg04.c-ctrip.com/images/0AS4h120008q4640297BB.png"}
                        width={"100%"}
                        height={"100%"}
                        classWrap={"booking_info_mindtour"}
                    />
                </ScrollView>
                <View className="booking_footer">
                    <Text>总额</Text>
                </View>
            </View>
        );
    }
}
