import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtFloatLayout, AtRate } from "taro-ui";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import Image from "../../common/base-component/image";
import Icon from "../../common/base-component/icon";
import { ISpotState } from "./interface";
import { getSpotInfo, getSpotRate, getSpotTicket, isUserFav } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "景点详情",
});

export default class Index extends PureComponent<any> {
    spotId: number;
    state: ISpotState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.getParams();
        this.state = {
            introOpen: false,
            requestOpen: false,
            ticket: {},
        };
        this.getInfo();
        this.getFav();
    }

    getParams = () => {
        const instance: any = this.instance;
        const data = instance.router.params;
        this.spotId = data.spotId;
    };

    getInfo = async () => {
        let response = await getSpotInfo(this, this.spotId);
        let ticketList = await getSpotTicket(this, response.spotId);
        for (let ticket of ticketList) {
            let tag = ticket.ticketTag;
            ticket.ticketTag = tag.split(" ");
        }
        response.ticketList = ticketList;
        let spotRate = await getSpotRate(this, response.spotId);
        response.spotRateNum = spotRate && spotRate.spotRateNum;
        response.spotRateScore = spotRate && spotRate.spotRateScore;
        this.setState({
            spotInfo: response,
        });
    };

    getFav = async () => {
        let isFav = await isUserFav(this, this.spotId);
        this.setState({
            isFav: isFav,
        });
    };

    switchIntro = () => {
        if (this.state.introOpen) {
            this.setState({
                introOpen: false,
            });
        } else {
            this.setState({
                introOpen: true,
            });
        }
    };

    goToBooking = () => {
        this.push("/pages/booking/index");
    };

    openRequest = res => {
        this.setState({
            ticket: res,
            requestOpen: true,
        });
    };

    closeRequest = () => {
        this.setState({
            request: "",
            requestOpen: false,
        });
    };

    render() {
        const { spotInfo, introOpen, isFav, requestOpen, ticket } = this.state;
        return (
            <View className="spotdetail">
                <H5NavBar />
                <ScrollView scrollY className="spotdetail_wrap" style={{ top: this.top }}>
                    <View className="spotdeail_image">
                        <Image url={spotInfo?.spotImageurl} width={"100%"} height={"200px"} />
                    </View>
                    {spotInfo ? (
                        <View className="spotdetail_basicInfo">
                            <View className="spotdetail_basicInfo_name">
                                <Text>{spotInfo.spotName}</Text>
                            </View>
                            <View className="spotdetail_basicInfo_detail">
                                <View className="spotdetail_basicInfo_left">
                                    <View className="spotdetail_basicInfo_rate">
                                        <AtRate value={spotInfo.spotRateScore} size={15} />
                                        <Text className="spotdetail_basicInfo_rate_num">
                                            {spotInfo.spotRateNum}条评价
                                        </Text>
                                    </View>
                                    <View className="spotdetail_basicInfo_time">
                                        <Text>
                                            开园时间：{spotInfo.spotOpenhour}-{spotInfo.spotOffhour}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    className="spotdetail_basicInfo_intro"
                                    onClick={this.switchIntro}
                                >
                                    <Text>查看简介</Text>
                                    <Icon type={"right"} />
                                </View>
                                <AtFloatLayout
                                    scrollY
                                    isOpened={introOpen}
                                    title={spotInfo.spotName + "简介"}
                                >
                                    <Text>{spotInfo.spotIntro}</Text>
                                </AtFloatLayout>
                            </View>

                            <View className="spotdetail_basicInfo_address">
                                <Text>{spotInfo.spotAddress}</Text>
                            </View>
                        </View>
                    ) : null}

                    {spotInfo && spotInfo.ticketList?.length ? (
                        <View className="spotdetail_ticketInfo">
                            <View className="spotdetail_ticketInfo_title">
                                <Text>景点门票</Text>
                            </View>
                            <View className="spotdetail_ticketInfo_card">
                                {spotInfo.ticketList.map((item, index) => {
                                    return (
                                        <View
                                            className=" spotdetail_ticketInfo_card_single 
                                                        spotdetail_ticketInfo_card_pbom 
                                                        spotdetail_ticketInfo_card_mtop"
                                            key={index}
                                        >
                                            <View>
                                                <View className="spotdetail_ticketInfo_card_title">
                                                    <Text>{item.ticketName}</Text>
                                                </View>
                                                <View className="spotdetail_ticketInfo_card_tag">
                                                    {item.ticketTag &&
                                                        item.ticketTag.map((tag, index) => {
                                                            let isLast =
                                                                item.ticketTag &&
                                                                item.ticketTag?.length - 1 ===
                                                                    index;
                                                            return (
                                                                <View
                                                                    style={{
                                                                        color: isLast
                                                                            ? "#666"
                                                                            : "#0086f6",
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <Text>{tag} </Text>
                                                                    {!isLast ? (
                                                                        <Text
                                                                            style={{
                                                                                color: "#666",
                                                                            }}
                                                                        >
                                                                            |{" "}
                                                                        </Text>
                                                                    ) : null}
                                                                </View>
                                                            );
                                                        })}
                                                </View>
                                                <View
                                                    className="spotdetail_ticketInfo_card_tag"
                                                    onClick={() => {
                                                        this.openRequest(item);
                                                    }}
                                                >
                                                    <Text>官方 | 购买须知 </Text>
                                                    <Icon type={"right"} />
                                                </View>
                                            </View>
                                            <View className="spotdetail_ticketInfo_card_price">
                                                <Text className="spotdetail_ticketInfo_card_price_currency">
                                                    ￥
                                                </Text>
                                                <Text className="spotdetail_ticketInfo_card_price_number">
                                                    {item.ticketPrice}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                                <AtFloatLayout
                                    isOpened={requestOpen}
                                    onClose={this.closeRequest}
                                    title={`${ticket.ticketName}购买要求`}
                                >
                                    <Text>{ticket.ticketRequest || "无"}</Text>
                                </AtFloatLayout>
                            </View>
                        </View>
                    ) : (
                        <View className="spotdetail_ticketInfo spotdetail_ticketInfo_title">
                            <Text>该景点暂无门票可售</Text>
                        </View>
                    )}

                    <View className="spotdetail_recommend">
                        <View className="spotdetail_recommend_title">
                            <Text>景点推荐</Text>
                        </View>
                        {/* todo */}
                    </View>
                </ScrollView>
                <View className="spotdetail_footer">
                    <View className="spotdetail_footer_left">
                        <View className="spotdetail_footer_left_single" onClick={() => {}}>
                            <View className="spotdetail_footer_left_icon">
                                {isFav ? (
                                    <Icon type={"aixin_shixin"} size={24} color={"#f5190a"} />
                                ) : (
                                    <Icon type={"aixin"} size={24} />
                                )}
                            </View>
                            <Text className="spotdetail_footer_left_text">
                                {isFav ? "已收藏" : "收藏"}
                            </Text>
                        </View>
                        <View
                            className="spotdetail_footer_left_single"
                            onClick={() => {
                                this.push("/pages/comment/index");
                            }}
                        >
                            <View className="spotdetail_footer_left_icon">
                                <Icon type={"pingjia"} size={24} />
                            </View>
                            <Text className="spotdetail_footer_left_text">写点评</Text>
                        </View>
                    </View>
                    <View className="spotdetail_footer_right">
                        <View className="spotdetail_footer_right_wrap" onClick={this.goToBooking}>
                            <View className="spotdetail_footer_right_button">
                                <Text>立即预定</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
