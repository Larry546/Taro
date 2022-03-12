import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtCalendar, AtFloatLayout, AtInput, AtInputNumber } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import getEnv from "../../system/tools/environment";
import Icon from "../../common/base-component/icon";
import Image from "../..//common/base-component/image";
import { IBookingState } from "./interface";
import TravelerList from "../../common/traveler/list";
import { IPassengerInfo } from "src/common/traveler/edit/interface";
import { getPassengerList, getSpotInfo, getSpotTicket, getUserInfo } from "../../api";
import { getDateString } from "../../system/tools/date";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单填写",
});

export default class Index extends PureComponent<any> {
    spotId: number;
    top: number;
    state: IBookingState;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            calendarOpen: false,
            listOpen: false,
            detailOpen: false,
            selectedDate: getDateString(new Date()),
        };
        this.getParams();
        this.getInitState();
    }

    getParams = () => {
        const instance = this.instance;
        const data = instance.router.params;
        this.spotId = data.spotId;
    };

    getInitState = async () => {
        let passlist = await getPassengerList(this);
        let info = await getSpotInfo(this, this.spotId);
        let ticketList = await getSpotTicket(this, this.spotId);
        let userInfo = await getUserInfo(this);
        for (let ticket of ticketList) {
            let tag = ticket.ticketTag;
            ticket.ticketTag = tag.split(" ");
        }
        info.ticketList = ticketList;
        this.setState({
            passengerlist: passlist,
            spotInfo: info,
            contact: userInfo.userContact || "",
        });
        this.initTicketList();
    };

    initTicketList = () => {
        let list: any = [];

        const { spotInfo } = this.state;
        spotInfo &&
            spotInfo.ticketList?.map(item => {
                list.push({
                    ticketId: item.ticketId,
                    ticketName: item.ticketName,
                    ticketPrice: item.ticketPrice,
                    ticketNum: 0,
                    passenger: [],
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

    onOpenList = ticketInfo => {
        this.setState({ listOpen: true, currentTicket: ticketInfo });
    };

    onCloseList = () => {
        this.setState({ listOpen: false });
    };

    onDayClick = res => {
        this.setState({ selectedDate: res && res.value });
        this.onCloseCalendar();
    };

    onChangeContact = res => {
        this.setState({ contact: res });
    };

    findTicket = id => {
        const { orderTicketList } = this.state;
        return orderTicketList?.find(item => item.ticketId === id);
    };

    getCount = item => {
        if (!item.passenger) {
            return item.ticketNum;
        } else {
            return item.ticketNum - item.passenger.length;
        }
    };

    changeTicketNum = (value, id) => {
        const { orderTicketList } = this.state;
        let index = orderTicketList?.findIndex(item => {
            return item.ticketId === id;
        });
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

    getTotal = () => {
        const { orderTicketList } = this.state;
        let total = 0;
        orderTicketList?.map(item => (total = total + item.ticketNum * item.ticketPrice));
        return total;
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

    onSelectTraveler = pass => {
        const { currentTicket, orderTicketList } = this.state;
        let ticketNum = currentTicket?.ticketNum;
        let passengerNum = currentTicket?.passenger?.length || 0;
        if (!ticketNum || !currentTicket || currentTicket.passenger?.includes(pass.passengerId)) {
            return;
        }
        if (ticketNum === passengerNum) {
            this.toast.show(
                `你已经选择了${currentTicket?.ticketNum}位${currentTicket?.ticketName}`
            );
        } else if (ticketNum > passengerNum) {
            currentTicket?.passenger?.push(pass.passengerId);
            let index = orderTicketList?.findIndex(item => {
                return item.ticketId === currentTicket?.ticketId;
            });
            let newList = orderTicketList;
            newList && typeof index != "undefined" && (newList[index] = currentTicket);
            this.setState((prevState: IBookingState) => {
                return {
                    ...prevState,
                    orderTicketList: newList,
                };
            });
            this.onCloseList();
        }
    };

    unSeletctTraveler = (ticketInfo, passid) => {
        let passIndex = ticketInfo.passenger.findIndex(id => {
            return id === passid;
        });
        ticketInfo.passenger.splice(passIndex, 1);
        const { orderTicketList } = this.state;
        let newList = orderTicketList;
        let ticketIndex = newList?.findIndex(item => {
            return item.ticketId == ticketInfo.ticketId;
        });
        newList && typeof ticketIndex != "undefined" && (newList[ticketIndex] = ticketInfo);
        this.setState((prev: IBookingState) => {
            return {
                ...prev,
                orderTicketList: newList,
            };
        });
    };

    onOpenDetail = () => {
        this.setState({ detailOpen: true });
    };

    onCloseDetail = () => {
        this.setState({ detailOpen: false });
    };

    render() {
        const {
            selectedDate,
            calendarOpen,
            listOpen,
            orderTicketList,
            currentTicket,
            spotInfo,
            contact,
            detailOpen,
        } = this.state;
        return (
            <View className="booking">
                <H5NavBar title={"订单填写"} />
                <ScrollView scrollY className="booking_info" style={{ top: this.top }}>
                    <View className="booking_info_spot">
                        <View className="booking_info_spot_title">
                            <Text>{spotInfo && spotInfo.spotName}</Text>
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
                                <AtFloatLayout
                                    isOpened={calendarOpen}
                                    onClose={this.onCloseCalendar}
                                >
                                    <AtCalendar
                                        format={"YYYY-MM-DD"}
                                        minDate={getDateString(new Date())}
                                        onDayClick={this.onDayClick}
                                    />
                                </AtFloatLayout>
                            </View>
                            <View className="booking_info_spot_sku_tickets">
                                {spotInfo &&
                                    spotInfo.ticketList?.length &&
                                    spotInfo.ticketList.map((item, index) => {
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
                                                                    color:
                                                                        index % 2
                                                                            ? "#0086f6"
                                                                            : "#F70",
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
                                                        <Text style={{ color: "#666" }}>官方</Text>
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
                        </View>
                        <View className="booking_info_passenger_info">
                            {orderTicketList?.map((item, index) => {
                                return item.ticketNum !== 0 ? (
                                    <View
                                        className="booking_info_passenger_info_single"
                                        key={index}
                                    >
                                        <View className="booking_info_passenger_info_single_name">
                                            <Text>{item.ticketName}</Text>
                                        </View>
                                        <View className="booking_info_passenger_info_single_right">
                                            <View className="booking_info_passenger_info_single_travelers">
                                                {item.passenger?.map((pasid, index) => {
                                                    return (
                                                        <View
                                                            className="booking_info_passenger_info_single_traveler"
                                                            key={index}
                                                        >
                                                            <View
                                                                className="booking_info_passenger_info_single_traveler_icon"
                                                                onClick={() => {
                                                                    this.unSeletctTraveler(
                                                                        item,
                                                                        pasid
                                                                    );
                                                                }}
                                                            >
                                                                <Icon
                                                                    type={"close-circle"}
                                                                    color={"#bbb"}
                                                                    size={20}
                                                                />
                                                            </View>

                                                            <View
                                                                className="booking_info_passenger_info_single_traveler_info"
                                                                onClick={() => {
                                                                    this.onOpenList(item);
                                                                }}
                                                            >
                                                                <Text className="booking_info_passenger_info_single_traveler_info_webkit">
                                                                    {
                                                                        this.getPass(pasid)
                                                                            .passengerName
                                                                    }
                                                                </Text>
                                                                <Text className="booking_info_passenger_info_single_traveler_info_webkit booking_info_passenger_info_single_traveler_info_id">
                                                                    证件号：
                                                                    {
                                                                        this.getPass(pasid)
                                                                            .passengerNumber
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            {!item.passenger ||
                                            item.ticketNum > item.passenger?.length ? (
                                                <View
                                                    className="booking_info_passenger_info_single_rest"
                                                    onClick={() => {
                                                        this.onOpenList(item);
                                                    }}
                                                >
                                                    <Text>还需添加 </Text>
                                                    <Text style={{ color: "#f60" }}>
                                                        {this.getCount(item)}
                                                    </Text>
                                                    <Text> 位{item.ticketName}</Text>
                                                </View>
                                            ) : null}
                                        </View>
                                        <View
                                            className="booking_info_passenger_info_single_icon"
                                            onClick={() => {
                                                this.onOpenList(item);
                                            }}
                                        >
                                            <Icon type={"right"} size={24} color={"#bbb"} />
                                        </View>
                                    </View>
                                ) : null;
                            })}
                            <AtFloatLayout
                                scrollY
                                isOpened={listOpen}
                                title={"游客列表"}
                                onClose={this.onCloseList}
                            >
                                <TravelerList
                                    orderTicketInfo={currentTicket}
                                    selectTraveler={this.onSelectTraveler}
                                />
                            </AtFloatLayout>
                        </View>
                        <View className="booking_info_passenger_contact">
                            <View className="booking_info_passenger_contact_title">
                                <Text>联系手机</Text>
                            </View>
                            <View className="booking_info_passenger_contact_input">
                                <AtInput
                                    placeholder={"用于生成订单"}
                                    name={"contact"}
                                    type={"number"}
                                    value={contact}
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
                    <View className="booking_footer_total">
                        <View className="booking_footer_total_title">
                            <Text>总额：</Text>
                        </View>
                        <View className="booking_footer_total_price">
                            <Text>￥{this.getTotal()}</Text>
                        </View>
                        <View className="booking_footer_total_detail" onClick={this.onOpenDetail}>
                            <Text>明细</Text>
                            <Icon type={"toTop"} />
                        </View>
                    </View>
                    <View className="booking_footer_submit" onClick={() => {}}>
                        <Text>提交订单</Text>
                    </View>
                </View>
                <AtFloatLayout
                    isOpened={detailOpen}
                    onClose={this.onCloseDetail}
                    title={"费用明细"}
                    scrollY
                >
                    <View className="booking_detail">
                        <View className="booking_detail_title">
                            <Text>{spotInfo && spotInfo.spotName}</Text>
                        </View>
                        <View className="booking_detail_tickets">
                            {orderTicketList &&
                                orderTicketList.map((item, index) => {
                                    return item.ticketNum ? (
                                        <View className="booking_detail_ticket" key={index}>
                                            <Text>{item.ticketName}</Text>
                                            <Text>
                                                ￥{item.ticketPrice} x{item.ticketNum}
                                            </Text>
                                        </View>
                                    ) : null;
                                })}
                        </View>
                        <View className="booking_detail_total">
                            <Text className="booking_detail_total_title">订单总额（在线支付）</Text>
                            <Text className="booking_detail_total_price">￥{this.getTotal()}</Text>
                        </View>
                    </View>
                </AtFloatLayout>
            </View>
        );
    }
}
