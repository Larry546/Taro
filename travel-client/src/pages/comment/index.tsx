import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import getEnv from "../../system/tools/environment";
import H5NavBar from "../../common/h5NavBar";
import { ICommentState } from "./interface";
import { AtRate, AtTextarea } from "taro-ui";
import { getSpotInfo, saveComment } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "点评",
});

export default class Index extends PureComponent<any> {
    spotId: number;
    state: ICommentState;
    top: number;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.state = {
            commentRate: 0,
            commentText: "",
        };
        this.getParams();
        this.getInfo();
    }

    getParams = () => {
        const instance: any = this.instance;
        const data = instance.router.params;
        this.spotId = data.spotId;
    };

    getInfo = async () => {
        let info = await getSpotInfo(this, this.spotId);
        this.setState({
            spotInfo: info,
        });
    };

    onSubmitComment = async () => {
        const { commentRate, commentText } = this.state;
        let info = {
            commentRate: commentRate,
            commentText: commentText,
            spotId: this.spotId,
        };
        let res = await saveComment(this, info);
        if (res) {
            this.toast.show("点评成功！3秒后返回");
            setTimeout(() => {
                this.pop();
            }, 3000);
        } else {
            this.toast.show("网络错误，点评失败!");
        }
    };

    render() {
        const { spotInfo, commentRate, commentText } = this.state;
        return (
            <View className="comment">
                <H5NavBar title={"点评"} />
                <View className="comment_wrap" style={{ top: this.top }}>
                    <View className="comment_spot">
                        <View className="comment_spot_name">
                            <Text>{spotInfo && spotInfo.spotName}</Text>
                        </View>
                        <View className="comment_spot_address">
                            <Text>{spotInfo && spotInfo.spotAddress}</Text>
                        </View>
                    </View>
                    <View className="comment_rate">
                        <View className="comment_rate_title">
                            <Text>评分</Text>
                        </View>
                        <View>
                            <AtRate
                                size={24}
                                value={commentRate}
                                onChange={value => {
                                    this.setState({ commentRate: value });
                                }}
                            />
                        </View>
                        <View className="comment_rate_tip">
                            <Text>点击评分</Text>
                        </View>
                    </View>
                    <View className="comment_edit">
                        <AtTextarea
                            value={commentText}
                            onChange={res => {
                                this.setState({ commentText: res });
                            }}
                            placeholder={"发表评价，旅途亮点，温馨TIPS。"}
                            height={200}
                        />
                    </View>
                    <View className="comment_button" onClick={this.onSubmitComment}>
                        <Text>提交</Text>
                    </View>
                </View>
            </View>
        );
    }
}
