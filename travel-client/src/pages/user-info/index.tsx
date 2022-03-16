import PureComponent from "../../common/pure-component";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import { IUserInfo } from "./interface";
import { getUserInfo, saveUser } from "../../api";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "用户信息",
});

export default class Index extends PureComponent<any> {
    state: IUserInfo;
    constructor(props: any) {
        super(props);
        this.state = {
            userAccount: "",
            userNickname: "",
            userContact: "",
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = async () => {
        let response = await getUserInfo(this);
        this.setState({
            userAccount: response.userAccount,
            userNickname: response.userNickname,
            userContact: response.userContact,
        });
    };

    saveInfo = () => {
        this.confirm.show({
            content: "是否要修改信息？",
            btnOK: ["取消", "确定"],
            btnCallBack: [
                () => {
                    this.save();
                },
            ],
        });
    };

    save = async () => {
        const { userNickname = "", userContact = "" } = this.state;
        let info = {
            userNickname: userNickname,
            userContact: userContact,
        };
        let res = await saveUser(this, info);
        if (res) {
            this.toast.show("修改用户信息成功！");
        } else {
            this.toast.show("网络错误，修改失败！");
        }
    };

    render() {
        const { userAccount = "", userNickname = "", userContact = "" } = this.state;
        return (
            <View className="userinfo">
                <H5NavBar />
                <View className="userinfo_info">
                    <View className="userinfo_info_title">
                        <View>
                            <Text>用户信息</Text>
                        </View>
                        <View className="userinfo_info_title_sub">
                            <Text>(暂不支持修改用户名密码)</Text>
                        </View>
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
                                title={"昵称"}
                                name="userNickname"
                                type="text"
                                value={userNickname || ""}
                                onChange={res => {
                                    this.setState({
                                        userNickname: res,
                                    });
                                }}
                            />
                            <AtInput
                                title={"联系方式"}
                                name="userContact"
                                type="text"
                                value={userContact || ""}
                                onChange={res => {
                                    this.setState({
                                        userContact: res,
                                    });
                                }}
                            />
                        </View>
                        <View className="userinfo_info_form_button">
                            <AtButton type="primary" size={"normal"} onClick={this.saveInfo}>
                                保存
                            </AtButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
