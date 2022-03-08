import PureComponent from "../../pure-component";
import { View, Text, Picker } from "@tarojs/components";
import { AtInput } from "taro-ui";
import Icon from "../../base-component/icon";
import { IEdit } from "./interface";

import "./index.scss";

export default class Index extends PureComponent<IEdit> {
    state: IEdit;
    constructor(props: IEdit) {
        super(props);
        this.state = this.props;
    }

    render() {
        const { passengerInfo } = this.state;
        const { passengerName, passengerNumber, passengerSex, passengerBirth } = passengerInfo;
        return (
            <View className="edit">
                <AtInput
                    name="姓名"
                    type="text"
                    onChange={() => {}}
                    title={"姓名"}
                    value={passengerName}
                    placeholder={"与证件姓名一致"}
                />
                <AtInput
                    name="证件号"
                    type="text"
                    onChange={() => {}}
                    title={"所持证件号"}
                    value={passengerNumber}
                    placeholder={"请输入证件号"}
                />
                <View className="edit_item">
                    <View className="edit_item_title">性别</View>
                    <View className="edit_sex" style={{ color: "#757575" }}>
                        <Icon type={"boy"} size={15} />
                        <View className="edit_sex_margin">
                            <Text>男</Text>
                        </View>
                    </View>
                    {/* // active #2698f7 */}
                    <View className="edit_sex" style={{ color: "#757575" }}>
                        <Icon type={"girl"} size={15} />
                        <View className="edit_sex_margin">
                            <Text>女</Text>
                        </View>
                    </View>
                </View>
                <View className="edit_item">
                    <View className="edit_item_title">出生日期</View>
                    <Picker mode="date" onChange={() => {}} value={"1980-01-01"}>
                        <View className="edit_item_placeholder">
                            <Text>{passengerBirth}</Text>
                        </View>
                    </Picker>
                </View>
                <View className="edit_button">
                    <Text>保存</Text>
                </View>
            </View>
        );
    }
}
