import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import Image from "../../common/base-component/image";
import SpotItem from "../../common/spot-item";
import { IState } from "./interface";
import { getSpotList, getSpotRate, getSpotTicket } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "首页",
});

export default class Index extends PureComponent<any> {
    state: IState;
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
        };
    }

    // componentDidMount() {
    //     this.getList();
    // }

    componentDidShow() {
        this.getList();
    }

    getList = async () => {
        let response = await getSpotList(this);
        if (!response) {
            return;
        }
        for (let spot of response) {
            spot.ticketList = await getSpotTicket(this, spot.spotId);
            let spotRate = await getSpotRate(this, spot.spotId);
            spot.spotRateNum = spotRate && spotRate.spotRateNum;
            spot.spotRateScore = spotRate && spotRate.spotRateScore;
        }
        this.setState({
            spotList: response,
        });
    };

    onChangeSearchValue = value => {
        this.setState({
            searchValue: value,
        });
    };

    showSpotList = param => {
        this.push(`/pages/spot-list/index?${param}`);
    };

    render() {
        const { searchValue, spotList } = this.state;
        return (
            <View className="index">
                <AtSearchBar
                    fixed
                    value={searchValue}
                    onChange={this.onChangeSearchValue}
                    onActionClick={() => {
                        this.showSpotList(`keyword=${searchValue}`);
                    }}
                />
                <ScrollView scrollY className="index_wrap">
                    <View className="index_gridNav">
                        <View
                            className="index_gridNav_single"
                            onClick={() => {
                                this.showSpotList("type=主题乐园");
                            }}
                        >
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/0304z120008ohe11bB97D.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>主题乐园</Text>
                        </View>
                        <View
                            className="index_gridNav_single"
                            onClick={() => {
                                this.showSpotList("type=动植物园");
                            }}
                        >
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/030101200099hcq9362E8.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>动植物园</Text>
                        </View>
                        <View
                            className="index_gridNav_single"
                            onClick={() => {
                                this.showSpotList("type=自然风光");
                            }}
                        >
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03049120008oheygoE687.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>自然风光</Text>
                        </View>
                        <View
                            className="index_gridNav_single"
                            onClick={() => {
                                this.showSpotList("type=城市观光");
                            }}
                        >
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03059120008ohf43y51A1.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>城市观光</Text>
                        </View>
                        <View
                            className="index_gridNav_single"
                            onClick={() => {
                                this.showSpotList("");
                            }}
                        >
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
                            {spotList &&
                                spotList.map((item, index) => {
                                    return (
                                        <View
                                            className="index_spot_info_mleft index_spot_info_mright"
                                            key={index}
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
