import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton, AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";
import Image from "../../common/base-component/image";
import SpotItem from "../../common/spot-item";
import { IState } from "./interface";
import { ISpotInfo } from "../spot-detail/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "首页",
});

export default class Index extends PureComponent<any> {
    state: IState;
    spotList: Array<ISpotInfo>;
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
        };
        this.spotList = [
            {
                spotId: 1,
                spotName: "上海野生动物园1111",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号",
                spotType: ["自然景观", "主题乐园", "动植物园"],
                spotIntro: "360度欣赏申城的地标。",
                ticketList: [
                    {
                        ticketId: 1,
                        ticketName: "成人票",
                        ticketPrice: 99,
                        ticketRequest: "1.4米以上",
                    },
                    {
                        ticketId: 2,
                        ticketName: "儿童票票",
                        ticketPrice: 44,
                        ticketRequest: "1.0米(含)-1.4米(含)",
                    },
                ],
            },
            {
                spotId: 2,
                spotName: "上海野生动物园2222",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
                spotType: ["动植物园"],
                spotIntro: "欣赏众多世界名人逼真蜡像。",
                ticketList: [
                    {
                        ticketId: 2,
                        ticketName: "儿童票票",
                        ticketPrice: 44,
                        ticketRequest: "1.0米(含)-1.4米(含)",
                    },
                ],
            },
            {
                spotId: 2,
                spotName: "上海野生动物园333",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
                spotType: ["主题乐园"],
                spotIntro: "欣赏各种品牌的罕见古董车。",
                ticketList: [
                    {
                        ticketId: 2,
                        ticketName: "儿童票票",
                        ticketPrice: 44,
                        ticketRequest: "1.0米(含)-1.4米(含)",
                    },
                ],
            },
            {
                spotId: 2,
                spotName: "上海野生动物园444",
                spotImageURL:
                    "https://youimg1.c-ctrip.com/target/010691200097uy8rk36FE_D_750_420.jpg?proc=autoorient",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
                spotType: ["自然景观"],
                spotIntro: "欣赏众多世界名人逼真蜡像。",
                ticketList: [
                    // {
                    //     ticketId: 2,
                    //     ticketName: "儿童票票",
                    //     ticketPrice: 44,
                    //     ticketRequest: "1.0米(含)-1.4米(含)",
                    // },
                ],
            },
        ];
    }
    componentWillMount() {
        // this.http.get("/user/list");
        console.log("instance", this.instance);
        console.log(
            "🚀 ~ file: index.tsx ~ line 17 ~ Index ~ componentWillMount ~ Taro.getSystemInfoSync();",
            Taro.getSystemInfoSync()
        );
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    onChangeSearchValue = value => {
        console.log("🚀 ~ file: index.tsx ~ line 50 ~ Index ~ value", value);
    };

    showSpotList = () => {
        this.push("/pages/spot-list/index");
    };

    render() {
        const { searchValue } = this.state;
        return (
            <View className="index">
                <AtSearchBar
                    fixed
                    value={searchValue}
                    onChange={this.onChangeSearchValue}
                    onActionClick={this.showSpotList}
                />
                <ScrollView scrollY className="index_wrap">
                    <View className="index_gridNav">
                        <View className="index_gridNav_single" onClick={() => {}}>
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/0304z120008ohe11bB97D.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>主题乐园</Text>
                        </View>
                        <View className="index_gridNav_single" onClick={() => {}}>
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/030101200099hcq9362E8.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>动植物园</Text>
                        </View>
                        <View className="index_gridNav_single" onClick={() => {}}>
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03049120008oheygoE687.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>自然风光</Text>
                        </View>
                        <View className="index_gridNav_single" onClick={() => {}}>
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03059120008ohf43y51A1.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>城市观光</Text>
                        </View>
                        <View className="index_gridNav_single" onClick={() => {}}>
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/0301j120008ohf3fp769A.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>全部景点</Text>
                        </View>
                    </View>

                    <View>
                        <Swiper
                            indicatorDots={true}
                            autoplay={true}
                            circular={true}
                            indicatorActiveColor={"#fff"}
                            className="index_swiper"
                        >
                            <SwiperItem>
                                <Image
                                    url={
                                        "https://dimg04.c-ctrip.com/images/0zg19120009cmztd879B4.jpg"
                                    }
                                    width={"100%"}
                                    height={"70px"}
                                />
                            </SwiperItem>
                            <SwiperItem>
                                <Image
                                    url={
                                        "https://dimg04.c-ctrip.com/images/0zg67120009cijruq1D49.jpg"
                                    }
                                    width={"100%"}
                                    height={"70px"}
                                />
                            </SwiperItem>
                            <SwiperItem>
                                <Image
                                    url={
                                        "https://dimg04.c-ctrip.com/images/0zg3p120009azze1o42DA.jpg"
                                    }
                                    width={"100%"}
                                    height={"70px"}
                                />
                            </SwiperItem>
                        </Swiper>
                    </View>
                    <View className="index_spot">
                        <View className="index_spot_title">
                            <Text>精选推荐</Text>
                        </View>
                        <View className="index_spot_info">
                            {this.spotList.map((item, index) => {
                                return (
                                    <View
                                        className="index_spot_info_mleft index_spot_info_mright"
                                        key={index}
                                        onClick={() => {}}
                                    >
                                        <SpotItem spotInfo={item} />
                                    </View>
                                );
                            })}
                        </View>
                        <View className="index_spot_end">
                            <Text> — 已经到底了! —</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
