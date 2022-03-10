import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtInput } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import { IUserInfoState } from "./interface";
import { getUser } from "../../system/tools/user";
import { getUserInfo } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户信息",
});

export default class Index extends PureComponent<any> {
    state: IUserInfoState;
    constructor(props: any) {
        super(props);
        this.state = {
            userInfo: {},
        };
        this.getUserInfo();
    }

    getUserInfo = async () => {
        let uid = getUser();
        let response = await getUserInfo(this, uid);
        console.log("🚀 ~ file: index.tsx ~ line 25 ~ Index ~ getUserInfo= ~ response", response);
        this.setState({
            userInfo: response,
        });
    };

    render() {
        const { userInfo = {} } = this.state;
        const { userAccount = "", userNickname = "", userContact = "" } = userInfo;
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
                                value={userAccount || ""}
                                onChange={() => {}}
                            />
                            <AtInput
                                required
                                disabled
                                title={"密码"}
                                name="userPassword"
                                type="password"
                                value={"******"}
                                onChange={() => {}}
                            />
                            <AtInput
                                disabled
                                title={"昵称"}
                                name="userNickname"
                                type="text"
                                value={userNickname || ""}
                                onChange={() => {}}
                            />
                            <AtInput
                                disabled
                                title={"联系方式"}
                                name="userContact"
                                type="text"
                                value={userContact || ""}
                                onChange={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
