import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import { IRegisterInfo } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户注册",
});

export default class Index extends PureComponent<any> {
    state: IRegisterInfo;
    constructor(props: any) {
        super(props);
        this.state = {
            userAccount: "",
            userPassword: "",
            userCheckPassword: "",
            userNickname: "",
            userContact: "",
        };
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    onChangeAccount = value => {
        this.setState({ userAccount: value });
    };

    onChangePassword = value => {
        this.setState({ userPassword: value });
    };

    onChangeCheckPassword = value => {
        this.setState({ userCheckPassword: value });
    };

    onChangeNickname = value => {
        this.setState({ userNickname: value });
    };

    onChangeContact = value => {
        this.setState({ onChangeContact: value });
    };

    register = () => {
        const { userAccount, userPassword, userCheckPassword, userContact, userNickname } =
            this.state;
        let cuserAccount = String(userAccount).replace(/-| /g, "");
        let cuserPassword = String(userPassword).replace(/-| /g, "");
        let cuserCheckPassword = String(userCheckPassword).replace(/-| /g, "");
        if (cuserAccount === "") {
            this.toast.show("用户名不能为空！");
            return;
        } else if (cuserPassword === "") {
            this.toast.show("密码不能为空！");
            return;
        } else if (cuserPassword !== cuserCheckPassword) {
            this.toast.show("两次密码输入不一致！");
        }
        // todo
    };

    render() {
        return (
            <View className="register">
                <H5NavBar />
                <View className="register_wrap">
                    <View className="register_title">
                        <Text>用户注册</Text>
                    </View>
                    <View className="register_form">
                        <View className="register_form_input">
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
                            <AtInput
                                required={true}
                                placeholder="再次输入密码"
                                name="userCheckPassword"
                                type="password"
                                value={this.state.userCheckPassword}
                                onChange={this.onChangeCheckPassword}
                            />
                            <AtInput
                                placeholder="昵称(选填)"
                                name="userNickname"
                                type="text"
                                value={this.state.userNickname}
                                onChange={this.onChangeNickname}
                            />
                            <AtInput
                                placeholder="联系方式(选填)"
                                name="userContact"
                                type="text"
                                value={this.state.userContact}
                                onChange={this.onChangeContact}
                            />
                        </View>
                        <View className="register_form_button">
                            <AtButton type={"primary"} size={"normal"} onClick={this.register}>
                                注册
                            </AtButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
