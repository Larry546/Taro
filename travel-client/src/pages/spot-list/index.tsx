import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import SpotCard from "../../common/spot-card";
import { ISpotListState } from "./interface";
import { getSpotByName, getSpotByType, getSpotList, getSpotRate, getSpotTicket } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "景点列表",
});

export default class Index extends PureComponent<any> {
    type: boolean;
    keyword: string;
    state: ISpotListState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.type = false;
        this.keyword = "";
        this.state = {
            spotList: [],
        };
        this.getParams();
        this.getList();
    }

    getParams = () => {
        const instance: any = this.instance;
        const data = instance.router.params;
        if (data) {
            if (data.type) {
                this.type = true;
                this.keyword = data.type || "";
            } else if (data.keyword) {
                this.type = false;
                this.keyword = data.keyword || "";
            }
        }
    };

    getList = async () => {
        let list;
        if (this.type) {
            list = await getSpotByType(this, this.keyword);
        } else if (this.keyword) {
            list = await getSpotByName(this, this.keyword);
        } else {
            list = await getSpotList(this);
        }
        for (let spot of list) {
            spot.ticketList = await getSpotTicket(this, spot.spotId);
            let spotRate = await getSpotRate(this, spot.spotId);
            spot.spotRateNum = spotRate && spotRate.spotRateNum;
            spot.spotRateScore = spotRate && spotRate.spotRateScore;
        }
        this.setState({
            spotList: list,
        });
    };

    render() {
        const { spotList } = this.state;
        return (
            <View className="spotlist">
                <H5NavBar title={"景点列表"} />
                <ScrollView scrollY className="spotlist_scroll" style={{ top: this.top }}>
                    {spotList && spotList.length ? (
                        <View>
                            {spotList.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <SpotCard spotInfo={item} />
                                    </View>
                                );
                            })}
                            <View className="spotlist_end">
                                <Text>没有更多了</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="spotlist_end">
                            <Text>没有相关景点</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}
