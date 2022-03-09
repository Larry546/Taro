import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton, AtGrid, AtList, AtListItem, AtAvatar } from "taro-ui";

import "../../common/base-component/icon/icon.scss";
import "./index.scss";

definePageConfig({
    navigationBarTitleText: "个人主页",
});

export default class Index extends PureComponent<any> {
    islogin: boolean;

    constructor(props: any) {
        super(props);
        this.getLoginStatus();
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    getLoginStatus = () => {
        this.islogin = true;
    };

    goToLogin = () => {
        this.push("/pages/user-login/index");
    };

    checkLoginStatus = () => {
        if (!this.islogin) {
            this.confirm.show({
                content: "请先登录",
                btnOK: ["返回", "去登陆"],
                btnCallBack: [this.goToLogin],
            });
            return false;
        }
    };

    goToOrderList = res => {
        // if (!this.checkLoginStatus()) return;
        this.push("/pages/order-list/index");

        console.log("🚀 ~ file: index.tsx ~ line 32 ~ Index ~ res", res);

        // this.push("/pages/order-list/index");
    };

    goToUserInfo = () => {
        // if (!this.checkLoginStatus()) return;
        this.push("/pages/user-info/index");
    };

    goToPassengerList = () => {
        // if (!this.checkLoginStatus()) return;
        this.push("/pages/traveler-list/index");
    };

    goToViewList = () => {};

    logout = () => {};

    render() {
        return (
            <View className="user">
                <View className="user_wrap">
                    <View className="user_header">
                        {this.islogin ? (
                            <View className="user_header_logined" onClick={this.goToUserInfo}>
                                <View className="user_header_avatar">
                                    <AtAvatar circle text="用户" size="large" />
                                </View>
                                <View className="user_header_info">
                                    <Text>UserName</Text>
                                    <Text className="user_header_info_account">账号：</Text>
                                </View>
                            </View>
                        ) : (
                            <View className="user_login" onClick={this.goToLogin}>
                                <Text>登陆/注册</Text>
                            </View>
                        )}
                    </View>

                    <View className="user_grid">
                        <AtGrid
                            hasBorder={false}
                            columnNum={4}
                            onClick={(item, index) => {
                                this.goToOrderList({ item, index });
                            }}
                            data={[
                                {
                                    iconInfo: {
                                        value: "moban",
                                        prefixClass: "icon",
                                        color: "#fab039",
                                    },
                                    value: "全部订单",
                                },
                                {
                                    iconInfo: {
                                        value: "daizhifu",
                                        prefixClass: "icon",
                                        color: "#dc9efd",
                                    },
                                    value: "待付款",
                                },
                                {
                                    iconInfo: {
                                        value: "solid-time",
                                        prefixClass: "icon",
                                        color: "#9dabff",
                                    },
                                    value: "未使用",
                                },
                                {
                                    iconInfo: {
                                        value: "daipingjia",
                                        prefixClass: "icon",
                                        color: "#5fb2e8",
                                    },
                                    value: "待评价",
                                },
                            ]}
                        />
                    </View>

                    <View className="user_list">
                        <AtList hasBorder={false}>
                            <AtListItem
                                title="个人信息"
                                arrow="right"
                                onClick={this.goToUserInfo}
                            />
                            <AtListItem
                                title="出行人信息"
                                arrow="right"
                                onClick={this.goToPassengerList}
                            />
                            <AtListItem
                                title="浏览历史"
                                arrow="right"
                                onClick={this.goToViewList}
                                disabled={true}
                            />
                            <AtListItem
                                title="我要合作"
                                arrow="right"
                                hasBorder={false}
                                disabled={true}
                            />
                        </AtList>
                    </View>

                    {this.islogin ? (
                        <View>
                            <View className="user_bottom">
                                <AtButton type="secondary" size={"normal"} onClick={this.logout}>
                                    退出登陆
                                </AtButton>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        );
    }
}
