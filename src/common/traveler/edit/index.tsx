import PureComponent from "../../pure-component";
import { View, Text, Picker } from "@tarojs/components";
import { AtInput } from "taro-ui";
import Icon from "../../base-component/icon";
import { IEditProps } from "./interface";
import { IPassengerInfo } from "../../traveler/edit/interface";

import "./index.scss";

export default class Index extends PureComponent<IEditProps> {
    state: IPassengerInfo;
    constructor(props: IEditProps) {
        super(props);
        this.state = {
            passengerId: props.passengerInfo.passengerId,
            passengerName: props.passengerInfo.passengerName,
            passengerNumber: props.passengerInfo.passengerNumber,
            passengerBirth: props.passengerInfo.passengerBirth,
            passengerSex: props.passengerInfo.passengerSex,
        };
    }

    componentWillReceiveProps(nextProps: IEditProps) {
        this.setState({
            passengerId: nextProps.passengerInfo.passengerId,
            passengerName: nextProps.passengerInfo.passengerName,
            passengerNumber: nextProps.passengerInfo.passengerNumber,
            passengerBirth: nextProps.passengerInfo.passengerBirth,
            passengerSex: nextProps.passengerInfo.passengerSex,
        });
    }

    render() {
        const { onSave } = this.props;
        const {
            passengerId,
            passengerName,
            passengerNumber,
            passengerSex,
            passengerBirth = "1980-01-01",
        } = this.state;
        return (
            <View className="edit">
                <AtInput
                    name="姓名"
                    type="text"
                    onChange={res => {
                        this.setState({ passengerName: res });
                    }}
                    title={"姓名"}
                    value={passengerName}
                    placeholder={"与证件姓名一致"}
                />
                <AtInput
                    name="证件号"
                    type="text"
                    onChange={res => {
                        this.setState({ passengerNumber: res });
                    }}
                    title={"所持证件号"}
                    value={passengerNumber}
                    placeholder={"请输入证件号"}
                />
                <View className="edit_item">
                    <View className="edit_item_title">性别</View>
                    <View
                        className="edit_sex"
                        style={{ color: `${passengerSex === "M" ? `#2698f7` : `#757575`}` }}
                        onClick={() => {
                            this.setState({ passengerSex: "M" });
                        }}
                    >
                        <Icon type={"boy"} size={15} />
                        <View className="edit_sex_margin">
                            <Text>男</Text>
                        </View>
                    </View>
                    <View
                        className="edit_sex"
                        style={{ color: `${passengerSex === "F" ? `#2698f7` : `#757575`}` }}
                        onClick={() => {
                            this.setState({ passengerSex: "F" });
                        }}
                    >
                        <Icon type={"girl"} size={15} />
                        <View className="edit_sex_margin">
                            <Text>女</Text>
                        </View>
                    </View>
                </View>
                <View className="edit_item">
                    <View className="edit_item_title">出生日期</View>
                    <Picker
                        mode="date"
                        onChange={res => {
                            this.setState({ passengerBirth: res.detail.value });
                        }}
                        value={passengerBirth}
                    >
                        <View className="edit_item_placeholder">
                            <Text>{passengerBirth}</Text>
                        </View>
                    </Picker>
                </View>
                <View
                    className="edit_button"
                    onClick={() => {
                        onSave &&
                            onSave({
                                passengerId: passengerId,
                                passengerName: passengerName,
                                passengerNumber: passengerNumber,
                                passengerBirth: passengerBirth,
                                passengerSex: passengerSex,
                            });
                    }}
                >
                    <Text>保存</Text>
                </View>
            </View>
        );
    }
}
