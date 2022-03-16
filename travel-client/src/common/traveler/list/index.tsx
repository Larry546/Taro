import PureComponent from "../../pure-component";
import { View, Text } from "@tarojs/components";
import Icon from "../../base-component/icon";
import { AtFloatLayout } from "taro-ui";
import TravelerEdit from "../edit";
import { IListProps, IListState } from "./interface";
import { deletePassenger, getPassengerList, savePassenger } from "../../../api";

import "./index.scss";

export default class Index extends PureComponent<IListProps> {
    state: IListState;
    constructor(props: IListProps) {
        super(props);
        this.state = {
            editOpened: false,
            currentPassenger: {},
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        let response = await getPassengerList(this);
        this.setState({
            passengerlist: response,
        });
    };

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

    saveTraveler = async pass => {
        const { needUpdateList } = this.props;
        let res = await savePassenger(this, pass);
        if (res) {
            let newList = await getPassengerList(this);
            this.setState({
                passengerlist: newList,
            });
            needUpdateList && needUpdateList(newList);
            this.onCloseEdit();
        } else {
            this.toast.show("网络错误，保存失败!");
        }
    };

    onDeletePass = passId => {
        this.confirm.show({
            content: "是否要删除该出行人？",
            btnOK: ["取消", "确定"],
            btnCallBack: [
                () => {
                    this.deletePass(passId);
                },
            ],
        });
    };

    deletePass = async passId => {
        const { passengerlist = [] } = this.state;
        let res = await deletePassenger(this, passId);
        if (res) {
            let passIndex = passengerlist.findIndex(item => {
                return item.passengerId === passId;
            });
            passengerlist.splice(passIndex, 1);
        } else {
            this.toast.show("删除失败!");
        }

        this.setState({
            passengerlist: passengerlist,
        });
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
                    {passengerlist &&
                        passengerlist.map((item, index) => {
                            return (
                                <View className="list_traveler" key={index}>
                                    <View className="list_traveler_wrap">
                                        <View className="list_traveler_left">
                                            {orderTicketInfo?.ticketId ? (
                                                <View
                                                    className="list_traveler_icon"
                                                    onClick={() => {
                                                        this.onSelect(item);
                                                    }}
                                                >
                                                    <View className="list_traveler_icon_out">
                                                        <View
                                                            className="list_traveler_icon_circle"
                                                            style={{
                                                                background: orderTicketInfo.passenger?.includes(
                                                                    item.passengerId || -1
                                                                )
                                                                    ? "#0086f6"
                                                                    : "",
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            ) : (
                                                <View
                                                    className="list_traveler_icon"
                                                    onClick={() => {
                                                        this.onDeletePass(item.passengerId);
                                                    }}
                                                >
                                                    <Icon
                                                        type={"close-circle"}
                                                        color={"#bbb"}
                                                        size={20}
                                                    />
                                                </View>
                                            )}
                                            <View
                                                className="list_traveler_info"
                                                onClick={() => {
                                                    this.onSelect(item);
                                                }}
                                            >
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
