import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput, AtNavBar } from "taro-ui";
import getEnv from "../../system/tools/environment";
import { ILoginState } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户登录",
});

export default class Index extends PureComponent<any> {
    state: ILoginState;
    constructor(props: any) {
        super(props);
        this.state = {
            userAccount: "",
            userPassword: "",
        };
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    login = () => {
        const { userAccount, userPassword } = this.state;
        let cuserAccount = String(userAccount).replace(/-| /g, "");
        let cuserPassword = String(userPassword).replace(/-| /g, "");
        if (cuserAccount === "") {
            this.toast.show("用户名不能为空！");
            return;
        } else if (cuserPassword === "") {
            this.toast.show("密码不能为空！");
            return;
        }
        // todo
    };

    goToRegister = () => {
        this.push("/pages/user-register/index", true);
    };

    onChangeAccount = (value, evnet) => {
        this.setState({ userAccount: value });
    };

    onChangePassword = (value, evnet) => {
        this.setState({ userPassword: value });
    };

    render() {
        return (
            <View className="login">
                {getEnv() === "H5" ? (
                    <View>
                        <AtNavBar
                            border={false}
                            onClickLeftIcon={this.pop}
                            leftIconType={{ value: "left", prefixClass: "icon", color: "#000000" }}
                        ></AtNavBar>
                    </View>
                ) : null}
                <View className="login_wrap">
                    <View className="login_title">
                        <Text>用户登陆</Text>
                    </View>
                    <View className="login_form">
                        <AtInput
                            required={true}
                            placeholder="用户名"
                            name="userAccount"
                            type="text"
                            value={this.state.userAccount}
                            onChange={this.onChangeAccount}
                        />
                        <AtInput
                            required={true}
                            placeholder="密码"
                            name="userPassword"
                            type="password"
                            value={this.state.userPassword}
                            onChange={this.onChangePassword}
                        />
                        <View style={{ paddingTop: "20px" }} />
                        <View className="login_form_button">
                            <AtButton type={"primary"} size={"normal"} onClick={this.login}>
                                登陆
                            </AtButton>
                            <View style={{ paddingTop: "10px" }} />
                            <AtButton type="secondary" size={"normal"} onClick={this.goToRegister}>
                                注册
                            </AtButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
