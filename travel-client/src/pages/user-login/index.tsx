import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import { IUserInfo } from "../user-info/interface";
import { login } from "../../api/index";
import { setUser } from "../../system/tools/user";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户登录",
});

export default class Index extends PureComponent<any> {
    state: IUserInfo;
    constructor(props: any) {
        super(props);
        this.state = {
            userAccount: "",
            userPassword: "",
        };
    }

    login = async () => {
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
        let loginInfo = {
            userAccount: userAccount,
            userPassword: userPassword,
        };
        let response = await login(this, loginInfo);
        if (response && response.code === 1) {
            setUser(response.uid);
            this.push("/pages/user/index", true);
        } else if (response && response.code === 0) {
            this.toast.show(response.msg);
        } else {
            this.toast.show("网络不给力，请稍后重试!");
        }
    };

    goToRegister = () => {
        this.push("/pages/user-register/index", true);
    };

    onChangeAccount = value => {
        this.setState({ userAccount: value });
    };

    onChangePassword = value => {
        this.setState({ userPassword: value });
    };

    render() {
        const { userAccount, userPassword } = this.state;
        return (
            <View className="login">
                <H5NavBar />
                <View className="login_wrap">
                    <View className="login_title">
                        <Text>用户登陆</Text>
                    </View>
                    <View className="login_form">
                        <View className="login_form_input">
                            <AtInput
                                required={true}
                                placeholder="用户名"
                                name="userAccount"
                                type="text"
                                value={userAccount}
                                onChange={this.onChangeAccount}
                            />
                            <AtInput
                                required={true}
                                placeholder="密码"
                                name="userPassword"
                                type="password"
                                value={userPassword}
                                onChange={this.onChangePassword}
                            />
                        </View>
                        <View className="login_form_button">
                            <AtButton type={"primary"} size={"normal"} onClick={this.login}>
                                登陆
                            </AtButton>
                            <View style={{ paddingBottom: "10px" }} />
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
