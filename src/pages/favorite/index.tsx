import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtList } from "taro-ui";
import { ISpotInfo } from "../spot-detail/interface";
import SpotCard from "../../common/spot-card";

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

    deleteFav = () => {
        this.toast.show("deleteFav");
    };

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
                                        <SpotCard
                                            index={index}
                                            deleteFav={this.deleteFav}
                                            spotInfo={item}
                                            fromFav={true}
                                        />
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
