import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtFloatLayout, AtRate } from "taro-ui";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import Image from "../../common/base-component/image";
import Icon from "../../common/base-component/icon";
import { ISpotInfo, ISpotState } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "景点详情",
});

export default class Index extends PureComponent<any> {
    state: ISpotState;
    top: number;
    spotInfo: ISpotInfo;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            introOpen: false,
        };
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
                    ticketRequest: "1.4米以上",
                    ticketTag: ["无需取票", "无忧退"],
                },
                {
                    ticketId: 2,
                    ticketName: "儿童票票",
                    ticketPrice: 44,
                    ticketRequest: "1.0米(含)-1.4米(含)",
                    ticketTag: ["无需取票"],
                },
            ],
        };
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

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

    render() {
        return (
            <View className="spotdetail">
                <H5NavBar />
                <ScrollView scrollY className="spotdetail_wrap" style={{ top: this.top }}>
                    <View className="spotdeail_image">
                        <Image
                            url={
                                "https://youimg1.c-ctrip.com/target/010691200097uy8rk36FE_D_750_420.jpg?proc=autoorient"
                            }
                            width={"100%"}
                            height={"200px"}
                        />
                    </View>
                    <View className="spotdetail_basicInfo">
                        <View className="spotdetail_basicInfo_name">
                            <Text>{this.spotInfo.spotName}</Text>
                        </View>
                        <View className="spotdetail_basicInfo_detail">
                            <View className="spotdetail_basicInfo_left">
                                <View className="spotdetail_basicInfo_rate">
                                    <AtRate value={this.spotInfo.spotRateScore} size={15} />
                                    <Text className="spotdetail_basicInfo_rate_num">
                                        {this.spotInfo.spotRateNum}条评价
                                    </Text>
                                </View>
                                <View className="spotdetail_basicInfo_time">
                                    <Text>
                                        开园时间：{this.spotInfo.spotOpenhour}-
                                        {this.spotInfo.spotOffhour}
                                    </Text>
                                </View>
                            </View>
                            <View className="spotdetail_basicInfo_intro" onClick={this.switchIntro}>
                                <Text>查看简介</Text>
                                <Icon type={"right"} />
                            </View>
                            <AtFloatLayout
                                scrollY
                                isOpened={this.state.introOpen}
                                title={this.spotInfo.spotName + "简介"}
                            >
                                <Text>{this.spotInfo.spotIntro}</Text>
                            </AtFloatLayout>
                        </View>

                        <View className="spotdetail_basicInfo_address">
                            <Text>{this.spotInfo.spotAddress}</Text>
                        </View>
                    </View>
                    {this.spotInfo.ticketList?.length ? (
                        <View className="spotdetail_ticketInfo">
                            <View className="spotdetail_ticketInfo_title">
                                <Text>景点门票</Text>
                            </View>
                            <View className="spotdetail_ticketInfo_card">
                                {this.spotInfo.ticketList.map((item, index) => {
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
                                                    {item.ticketTag?.map((tag, index) => {
                                                        let isLast =
                                                            item.ticketTag &&
                                                            item.ticketTag?.length - 1 === index;
                                                        return (
                                                            <View
                                                                style={{
                                                                    color: isLast
                                                                        ? "#666"
                                                                        : "#0086f6",
                                                                }}
                                                            >
                                                                <Text>{tag} </Text>
                                                                {!isLast ? (
                                                                    <Text style={{ color: "#666" }}>
                                                                        |{" "}
                                                                    </Text>
                                                                ) : null}
                                                            </View>
                                                        );
                                                    })}
                                                </View>
                                                <View
                                                    className="spotdetail_ticketInfo_card_tag"
                                                    onClick={() => {}}
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
                                <Icon type={"aixin"} size={24} />
                            </View>
                            <Text className="spotdetail_footer_left_text">收藏</Text>
                        </View>
                        <View className="spotdetail_footer_left_single" onClick={() => {}}>
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
