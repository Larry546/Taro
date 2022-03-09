import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import { ICommentState } from "./interface";
import { AtRate, AtTextarea } from "taro-ui";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "点评",
});

export default class Index extends PureComponent<any> {
    state: ICommentState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            spotInfo: {
                spotId: 1,
                spotName: "绍兴柯岩风景区",
                spotAddress: "浙江省绍兴道558号柯岩风景区",
                spotOpenhour: "8:00",
                spotOffhour: "16:00",
            },
            rate: 0,
            edit: "",
        };
    }

    render() {
        const { spotInfo, rate, edit } = this.state;
        return (
            <View className="comment">
                <H5NavBar title={"点评"} />
                <View className="comment_wrap" style={{ top: this.top }}>
                    <View className="comment_spot">
                        <View className="comment_spot_name">
                            <Text>{spotInfo.spotName}</Text>
                        </View>
                        <View className="comment_spot_address">
                            <Text>{spotInfo.spotAddress}</Text>
                        </View>
                    </View>
                    <View className="comment_rate">
                        <View className="comment_rate_title">
                            <Text>评分</Text>
                        </View>
                        <View>
                            <AtRate
                                size={24}
                                value={rate}
                                onChange={value => {
                                    this.setState({ rate: value });
                                }}
                            />
                        </View>
                        <View className="comment_rate_tip">
                            <Text>点击评分</Text>
                        </View>
                    </View>
                    <View className="comment_edit">
                        <AtTextarea
                            value={edit}
                            onChange={res => {
                                this.setState({ edit: res });
                            }}
                            placeholder={"发表评价，旅途亮点，温馨TIPS。"}
                            height={200}
                        />
                    </View>
                    <View className="comment_button" onClick={() => {}}>
                        <Text>提交</Text>
                    </View>
                </View>
            </View>
        );
    }
}
