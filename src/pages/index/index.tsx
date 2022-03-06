import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton, AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";
import Image from "../../common/base-component/image";
import { IState } from "./interface";

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
                        <View className="index_gridNav_single">
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/0304z120008ohe11bB97D.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>主题乐园</Text>
                        </View>
                        <View className="index_gridNav_single">
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/030101200099hcq9362E8.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>动植物园</Text>
                        </View>
                        <View className="index_gridNav_single">
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03049120008oheygoE687.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>自然风光</Text>
                        </View>
                        <View className="index_gridNav_single">
                            <Image
                                url={"https://dimg04.c-ctrip.com/images/03059120008ohf43y51A1.png"}
                                width={"60px"}
                                height={"60px"}
                            />
                            <Text>城市观光</Text>
                        </View>
                        <View className="index_gridNav_single">
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
                    </View>
                </ScrollView>
            </View>
        );
    }
}
