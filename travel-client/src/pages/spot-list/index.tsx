import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import { ISpotInfo } from "../spot-detail/interface";
import SpotCard from "../../common/spot-card";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "景点列表",
});

export default class Index extends PureComponent<any> {
    top: number;
    spotList: Array<ISpotInfo>;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.spotList = [
            {
                spotId: 1,
                spotName: "上海野生动物园",
                spotImageURL:
                    "https://dimg01.c-ctrip.com/images/100o0e00000073et10793_C_224_172.jpg",
                spotRateScore: 4.4,
                spotRateNum: 666,
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号",
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
                spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
                spotType: ["无需取票"],
                ticketList: [
                    {
                        ticketId: 2,
                        ticketName: "儿童票票",
                        ticketPrice: 44,
                        ticketRequest: "1.0米(含)-1.4米(含)",
                    },
                ],
            },
        ];
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className="spotlist">
                <H5NavBar title={"景点列表"} />
                <ScrollView scrollY className="spotlist_scroll" style={{ top: this.top }}>
                    {this.spotList.length ? (
                        <View>
                            {this.spotList.map((item, index) => {
                                return <SpotCard index={index} spotInfo={item} />;
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
