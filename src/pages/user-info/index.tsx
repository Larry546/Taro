import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtInput } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import { IUserInfo, IUserInfoState } from "./interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户信息",
});

export default class Index extends PureComponent<any> {
    state: IUserInfoState;
    constructor(props: any) {
        super(props);
        this.state = {
            userInfo: {
                userId: 1,
                userAccount: "123",
                userPassword: "123456",
            },
        };
    }

    render() {
        const { userInfo } = this.state;
        return (
            <View className="userinfo">
                <H5NavBar />
                <View className="userinfo_info">
                    <View className="userinfo_info_title">
                        <Text>用户信息(暂不支持修改)</Text>
                    </View>
                    <View className="userinfo_info_form">
                        <View className="userinfo_info_form_input">
                            <AtInput
                                required
                                disabled
                                title={"用户名"}
                                name="userAccount"
                                type="text"
                                value={userInfo.userAccount}
                                onChange={() => {}}
                            />
                            <AtInput
                                required
                                disabled
                                title={"密码"}
                                name="userPassword"
                                type="password"
                                value={userInfo.userPassword}
                                onChange={() => {}}
                            />
                            <AtInput
                                disabled
                                title={"昵称"}
                                name="userNickname"
                                type="text"
                                value={userInfo.userNickname || ""}
                                onChange={() => {}}
                            />
                            <AtInput
                                disabled
                                title={"联系方式"}
                                name="userContact"
                                type="text"
                                value={userInfo.userContact || ""}
                                onChange={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
