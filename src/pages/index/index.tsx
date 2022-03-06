import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtButton, AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";
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

    showToast = () => {
        this.toast.show("this is a toast");
    };

    showConfirm = () => {
        this.confirm.show({
            title: "confirm",
            content: "this is a confirm",
        });
    };

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
                <ScrollView scrollY className="index_wrap" style={{ height: "100%" }}>
                    <Text>Hello world!</Text>
                    <AtButton type="primary" onClick={this.showToast}>
                        showToast_1
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_2
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_3
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_4
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_5
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_6
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_7
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_8
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_9
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_10
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_11
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_12
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_13
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_14
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_15
                    </AtButton>
                    <AtButton type="primary" onClick={this.showConfirm}>
                        showComfirm_16
                    </AtButton>
                </ScrollView>
            </View>
        );
    }
}
