import PureComponent from "../../pure-component";
import { View, Text } from "@tarojs/components";
import Icon from "../../base-component/icon";

import "./index.scss";
import { IPassengerInfo } from "../edit/interface";

export default class Index extends PureComponent<any> {
    passengerlist: Array<IPassengerInfo>;
    constructor(props: any) {
        super(props);
        this.passengerlist = [
            {
                passengerId: 1,
                passengerName: "啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈",
                passengerNumber:
                    "123456123456123456123456123456123456123456123456123456123456123456123456123456123456",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 2,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 3,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 4,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 2,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 3,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 4,
                passengerName: "哈哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
        ];
    }

    render() {
        return (
            <View className="list">
                <View className="list_add" onClick={() => {}}>
                    <View className="list_add_icon">
                        <Icon type={"xinzeng"} color={"#0086f6"} size={22} />
                    </View>
                    <Text>新增游客</Text>
                </View>
                <View className="list_travelers">
                    {this.passengerlist.map((item, index) => {
                        return (
                            <View className="list_traveler" key={index}>
                                <View className="list_traveler_wrap">
                                    <View className="list_traveler_left" onClick={() => {}}>
                                        <View className="list_traveler_icon">
                                            <View className="list_traveler_icon_circle" />
                                        </View>
                                        <View className="list_traveler_info">
                                            <Text className="list_traveler_info_name list_traveler_info_webkit">
                                                {item.passengerName}
                                            </Text>
                                            <Text className="list_traveler_info_id list_traveler_info_webkit">
                                                证件号：
                                                {item.passengerNumber}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="list_traveler_edit" onClick={() => {}}>
                                        <Icon type={"xiezi"} color={"#0086f6"} size={28} />
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}
