import PureComponent from "../../pure-component";
import { View, Text } from "@tarojs/components";
import Icon from "../../base-component/icon";
import { IPassengerInfo } from "../edit/interface";
import { AtFloatLayout } from "taro-ui";
import TravelerEdit from "../edit";
import { IListProps, IListState } from "./interface";

import "./index.scss";

export default class Index extends PureComponent<IListProps> {
    state: IListState;
    constructor(props: IListProps) {
        super(props);
        this.state = {
            editOpened: false,
            currentPassenger: {},
            passengerlist: [
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
                    passengerSex: "M",
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
                    passengerId: 5,
                    passengerName: "哈4哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 6,
                    passengerName: "哈rr哈",
                    passengerNumber: "123",
                    passengerSex: "M",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 7,
                    passengerName: "哈ss哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 8,
                    passengerName: "哈xx哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 9,
                    passengerName: "哈aa哈",
                    passengerNumber: "123",
                    passengerSex: "M",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 10,
                    passengerName: "哈gg哈",
                    passengerNumber: "123",
                    passengerSex: "M",
                    passengerBirth: "1988-01-01",
                },
            ],
        };
    }

    onOpenEdit = item => {
        this.setState({ editOpened: true, currentPassenger: item });
    };

    onCloseEdit = () => {
        this.setState({ editOpened: false });
    };

    onSelect = pass => {
        const { selectTraveler } = this.props;
        if (selectTraveler) {
            selectTraveler(pass);
        } else {
            this.onOpenEdit(pass);
        }
    };

    saveTraveler = pass => {
        const { passengerlist } = this.state;
        let passIndex = passengerlist.findIndex(item => {
            return item.passengerId === pass.passengerId;
        });
        let newList = passengerlist;
        if (passIndex === -1) {
            // 请求接口增加出行人，并进行更新state
            this.setState({});
        } else {
            newList[passIndex] = pass;
            // todo 请求接口更新出行人

            this.setState({
                passengerlist: newList,
            });
        }
        this.onCloseEdit();
    };

    render() {
        const { orderTicketInfo } = this.props;
        const { currentPassenger, editOpened, passengerlist } = this.state;
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
                    {passengerlist.map((item, index) => {
                        return (
                            <View className="list_traveler" key={index}>
                                <View className="list_traveler_wrap">
                                    <View
                                        className="list_traveler_left"
                                        onClick={() => {
                                            this.onSelect(item);
                                        }}
                                    >
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
                        <TravelerEdit passengerInfo={currentPassenger} onSave={this.saveTraveler} />
                    </AtFloatLayout>
                </View>
                <View className="list_end">
                    <Text>已展示所有常用出行人</Text>
                </View>
            </View>
        );
    }
}
