import PureComponent from "../../pure-component";
import { View, Text } from "@tarojs/components";
import Icon from "../../base-component/icon";
import { IPassengerInfo } from "../edit/interface";
import { AtFloatLayout } from "taro-ui";
import TravelerEdit from "../edit";
import { IListProp, IListState } from "./interface";

import "./index.scss";

export default class Index extends PureComponent<any> {
    state: IListState;
    passengerlist: Array<IPassengerInfo>;
    constructor(props: any) {
        super(props);
        this.state = {
            editOpened: false,
            currentPassenger: {},
        };
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
                passengerName: "哈哈1",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 3,
                passengerName: "哈2哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 4,
                passengerName: "哈哈3",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 2,
                passengerName: "哈4哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 3,
                passengerName: "哈rr哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 4,
                passengerName: "哈ss哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 4,
                passengerName: "哈xx哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 2,
                passengerName: "哈aa哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
            {
                passengerId: 3,
                passengerName: "哈gg哈",
                passengerNumber: "123",
                passengerSex: "F",
                passengerBirth: "1988-01-01",
            },
        ];
    }

    componentWillReceiveProps(nextProps: IListProp) {
        // this.setState({orderTicketInfo: nextProps.orderTicketInfo})
    }

    onOpenEdit = item => {
        this.setState({ editOpened: true, currentPassenger: item });
    };

    onCloseEdit = () => {
        this.setState({ editOpened: false });
    };

    render() {
        const { orderTicketInfo } = this.props;
        const { currentPassenger, editOpened } = this.state;
        return (
            <View className="list">
                <View
                    className="list_add"
                    onClick={() => {
                        this.onOpenEdit({});
                    }}
                >
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
                                        {orderTicketInfo?.ticketId ? (
                                            <View className="list_traveler_icon">
                                                <View className="list_traveler_icon_circle" />
                                            </View>
                                        ) : null}
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
                                    <View
                                        className="list_traveler_edit"
                                        onClick={() => {
                                            this.onOpenEdit(item);
                                        }}
                                    >
                                        <Icon type={"xiezi"} color={"#0086f6"} size={28} />
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                    <AtFloatLayout
                        title={currentPassenger.passengerId ? "编辑出行人" : "新增出行人"}
                        isOpened={editOpened}
                        onClose={this.onCloseEdit}
                    >
                        <TravelerEdit passengerInfo={currentPassenger} />
                    </AtFloatLayout>
                </View>
                <View className="list_end">
                    <Text>已展示所有常用出行人</Text>
                </View>
            </View>
        );
    }
}
