import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtList } from "taro-ui";
import { ISpotInfo } from "../spot-detail/interface";

import Image from "../../common/base-component/image";
import Icon from "../../common/base-component/icon";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "收藏",
});

export default class Index extends PureComponent<any> {
    spotList: Array<ISpotInfo>;

    constructor(props: any) {
        super(props);
        this.spotList = [
            {
                spotId: 1,
                spotName: "上海野生动物园",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotType: ["实时订票", "无需取票", "可定今日"],
            },
            {
                spotId: 2,
                spotName: "上海野生动物园",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotType: ["无需取票"],
            },
        ];
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    goToDetail = () => {
        this.push("/pages/spot-detail/index");
    };

    deleteFav = () => {};

    render() {
        return (
            <View className="favorite">
                <ScrollView scrollY className="favorite_wrap">
                    <View className="favorite_header">
                        <Text className="favorite_header_text">收藏头部内容收藏头部内容</Text>
                    </View>
                    {this.spotList.length ? (
                        <View>
                            <AtList>
                                {this.spotList.map((item, index) => {
                                    return (
                                        <View className="favorite_spot" key={index}>
                                            <View
                                                className="favorite_spot_left"
                                                onClick={this.goToDetail}
                                            >
                                                <Image
                                                    classWrap={"favorite_spot_left_image"}
                                                    url={item.spotImageURL}
                                                    width={"100%"}
                                                    height={"100%"}
                                                />
                                                <View className="favorite_spot_left_text">
                                                    <View className="favorite_spot_left_text_title">
                                                        <Text>{item.spotName}</Text>
                                                    </View>
                                                    <View className="favorite_spot_left_text_score">
                                                        <Text>
                                                            {item.spotRateScore}分{" "}
                                                            {item.spotRateNum}
                                                            人评价
                                                        </Text>
                                                    </View>
                                                    {item.spotType && item.spotType?.length >= 1 ? (
                                                        <View className="favorite_spot_left_text_type">
                                                            <Text>{item.spotType[0]}</Text>
                                                        </View>
                                                    ) : null}
                                                </View>
                                            </View>

                                            <View
                                                className="favorite_spot_right"
                                                onClick={this.deleteFav}
                                            >
                                                <Icon
                                                    type={"cuowuguanbiquxiao"}
                                                    size={24}
                                                    color={"red"}
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </AtList>
                            <View className="favorite_end" style={{ height: "50px" }}>
                                <Text>没有更多了</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="favorite_end">
                            <Text>没有收藏,美好的事物值得收藏</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}
