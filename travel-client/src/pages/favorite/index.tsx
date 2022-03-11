import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtList } from "taro-ui";
import SpotCard from "../../common/spot-card";
import { IFavState } from "./interface";
import { getSpotRate, getUserFav } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "收藏",
});

export default class Index extends PureComponent<any> {
    state: IFavState;

    constructor(props: any) {
        super(props);
        this.state = {
            spotList: [],
        };
        this.getList();
    }

    getList = async () => {
        let response = await getUserFav(this);
        for (let spot of response) {
            let spotRate = await getSpotRate(this, spot.spotId);
            spot.spotRateNum = spotRate && spotRate.spotRateNum;
            spot.spotRateScore = spotRate && spotRate.spotRateScore;
        }
        this.setState({
            spotList: response,
        });
    };

    goToDetail = () => {
        this.push("/pages/spot-detail/index");
    };

    deleteFav = () => {
        this.toast.show("deleteFav");
    };

    render() {
        const { spotList } = this.state;
        return (
            <View className="favorite">
                <ScrollView scrollY className="favorite_wrap">
                    <View className="favorite_header">
                        <Text className="favorite_header_text">收藏头部内容收藏头部内容</Text>
                    </View>
                    {spotList && spotList.length ? (
                        <View>
                            <AtList>
                                {spotList.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <SpotCard
                                                index={index}
                                                deleteFav={this.deleteFav}
                                                spotInfo={item}
                                                fromFav={true}
                                            />
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
