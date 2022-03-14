import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtList } from "taro-ui";
import SpotCard from "../../common/spot-card";
import { IFavState } from "./interface";
import { deFav, getSpotRate, getUserFav } from "../../api";

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

    componentDidShow() {
        this.getList();
    }

    getList = async () => {
        let response = await getUserFav(this);
        console.log("🚀 ~ file: index.tsx ~ line 31 ~ Index ~ getList= ~ response", response);
        if (response) {
            for (let spot of response) {
                let spotRate = await getSpotRate(this, spot.spotId);
                spot.spotRateNum = spotRate && spotRate.spotRateNum;
                spot.spotRateScore = spotRate && spotRate.spotRateScore;
            }
        }
        this.setState({
            spotList: response,
        });
    };

    goToDetail = () => {
        this.push("/pages/spot-detail/index");
    };

    onDeleteFav = async favoriteId => {
        let res = await deFav(this, favoriteId);
        const { spotList = [] } = this.state;
        if (res) {
            let deFavIndex = spotList.findIndex(item => {
                return item.favoriteId === favoriteId;
            });
            spotList.splice(deFavIndex, 1);
            this.setState({
                spotList: spotList,
            });
        } else {
            this.toast.show("删除收藏失败!");
        }
    };

    render() {
        const { spotList } = this.state;
        return (
            <View className="favorite">
                <ScrollView scrollY className="favorite_wrap">
                    <View className="favorite_header">
                        <Text className="favorite_header_text">我收藏的景点</Text>
                    </View>
                    {spotList && spotList.length ? (
                        <View>
                            <AtList>
                                {spotList.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <SpotCard
                                                deleteFav={() => {
                                                    this.onDeleteFav(item.favoriteId);
                                                }}
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
