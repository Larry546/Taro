import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtList } from "taro-ui";
import SpotCard from "../../common/spot-card";
import { IFavState } from "./interface";
import {
    deFav,
    getRecommend as _getRecommend,
    getSpotRate,
    getSpotTicket,
    getUserFav,
} from "../../api";
import SpotItem from "../../common/spot-item";

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
            recommendList: [],
        };
    }

    // componentDidMount() {
    //     this.getList();
    // }

    componentDidShow() {
        this.getList();
        this.getRecommend();
    }

    getList = async () => {
        let response = await getUserFav(this);
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

    getRecommend = async () => {
        let response = await _getRecommend(this, "user");
        if (response) {
            for (let spot of response) {
                spot.ticketList = await getSpotTicket(this, spot.spotId);
                let spotRate = await getSpotRate(this, spot.spotId);
                spot.spotRateNum = spotRate && spotRate.spotRateNum;
                spot.spotRateScore = spotRate && spotRate.spotRateScore;
            }
        }
        this.setState({
            recommendList: response,
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
        const { spotList, recommendList } = this.state;
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
                    {recommendList && recommendList.length ? (
                        <View className="favorite_recommend">
                            <View className="favorite_recommend_title">
                                <Text>猜你喜欢</Text>
                            </View>
                            <View className="favorite_recommend_info">
                                {recommendList.map((item, index) => {
                                    return (
                                        <View
                                            className="favorite_recommend_info_mleft favorite_recommend_info_mright"
                                            key={index}
                                        >
                                            <SpotItem spotInfo={item} />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
            </View>
        );
    }
}
