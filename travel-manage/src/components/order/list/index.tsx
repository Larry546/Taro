import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Input,
    message,
    Popconfirm,
    Row,
    Space,
    Table as BaseTable,
} from "antd";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import React from "react";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { IOrderState } from "./interface";
import {
    getOrderList as _getOrderList,
    getOrderPass as _getOrderPass,
    deleteOrder as _deleteOrder,
    unDeleteOrder as _unDeleteOrder,
} from "../../../service/api";

export default class OrderList extends React.PureComponent<any> {
    state: IOrderState;
    searchInput: any;
    constructor(props: any) {
        super(props);
        this.state = {
            orderlist: [],
            passengerlist: [],
            searchText: "",
            searchedColumn: "",
        };
    }

    componentDidMount() {
        this.getOrderList();
    }

    getOrderList = async () => {
        let res = await _getOrderList();
        let list = res || [];
        for (let order of list) {
            order.key = order.orderId;
        }
        this.setState({
            orderlist: list,
        });
    };

    getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = (clearFilters: any) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    getPassenger = async (orderId: number) => {
        let res = await _getOrderPass(orderId);
        let list = res || [];
        for (let i = 0; i < list.length; i++) {
            list[i].key = i;
        }
        this.setState({
            passengerlist: list,
        });
    };

    onExpand = (expanded: any, record: any) => {
        if (expanded) {
            this.getPassenger(record.orderId);
        } else {
            this.setState({
                passengerlist: [],
            });
        }
    };

    deleteOrder = async (orderId: number) => {
        let res = await _deleteOrder(orderId);
        if (res) {
            this.getOrderList();
            message.success("删除成功!");
        } else {
            message.error("删除失败");
        }
    };

    unDeleteOrder = async (orderId: number) => {
        let res = await _unDeleteOrder(orderId);
        if (res) {
            this.getOrderList();
            message.success("恢复成功!");
        } else {
            message.error("恢复失败");
        }
    };

    render() {
        const { orderlist, passengerlist } = this.state;
        const columns: ColumnProps<any>[] = [
            {
                title: "订单ID",
                dataIndex: "orderId",
                key: "1",
                fixed: "left",
                width: 100,
            },
            {
                title: "使用时间",
                dataIndex: "orderUsetime",
                key: "2",
                ...this.getColumnSearchProps("orderUsetime"),
            },
            {
                title: "总额",
                dataIndex: "orderTotal",
                key: "3",
                width: 200,
            },
            {
                title: "订单状态",
                dataIndex: "orderStatus",
                key: "4",
            },
            {
                title: "联系方式",
                dataIndex: "orderContact",
                key: "5",
            },
            {
                title: "创单时间",
                dataIndex: "orderCreatetime",
                key: "6",
            },
            {
                title: "景点ID",
                dataIndex: "spotId",
                key: "7",
                width: 100,
            },
            {
                title: "用户ID",
                dataIndex: "userId",
                key: "8",
                width: 100,
            },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 150,
                render: (value, record) => (
                    <div>
                        {record.isDeleted === 0 ? (
                            <Space size={"middle"}>
                                <a
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: "/app/order/edit",
                                            state: {
                                                orderId: record.orderId,
                                            },
                                        });
                                    }}
                                >
                                    编辑
                                </a>{" "}
                                <Popconfirm
                                    title={"确定要删除该订单?"}
                                    onConfirm={() => {
                                        this.deleteOrder(record.orderId);
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={"middle"}>
                                <span>已删除</span>
                                <Popconfirm
                                    title={"确定要恢复该订单?"}
                                    onConfirm={() => {
                                        this.unDeleteOrder(record.orderId);
                                    }}
                                >
                                    <a>恢复</a>
                                </Popconfirm>
                            </Space>
                        )}
                    </div>
                ),
            },
        ];

        const passengerColumns = [
            {
                title: "门票ID",
                dataIndex: "ticketId",
                key: "1",
                width: 100,
            },
            {
                title: "门票名",
                dataIndex: "ticketName",
                key: "2",
            },
            {
                title: "出行人ID",
                dataIndex: "passengerId",
                key: "3",
                width: 100,
            },
            {
                title: "出行人姓名",
                dataIndex: "passengerName",
                key: "4",
            },
            {
                title: "出行人证件号码",
                dataIndex: "passengerNumber",
                key: "5",
            },
            {
                title: "出行人性别",
                dataIndex: "passengerSex",
                key: "6",
                width: 200,
            },
            {
                title: "出行人出生日期",
                dataIndex: "passengerBirth",
                key: "7",
            },
            {
                title: "Action",
                key: "operation",
                width: 150,
                render: () => (
                    <Space size="middle">
                        <a>暂无可用操作</a>
                    </Space>
                ),
            },
        ];
        const expandedRowRender = () => {
            return (
                <BaseTable
                    columns={passengerColumns}
                    dataSource={passengerlist}
                    pagination={false}
                    tableLayout={"fixed"}
                />
            );
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom breads={["订单管理", "订单列表"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="订单管理" bordered={false}>
                                <div>
                                    <BaseTable
                                        columns={columns}
                                        dataSource={orderlist}
                                        expandable={{
                                            expandedRowRender,
                                            onExpand: this.onExpand,
                                        }}
                                        scroll={{ x: 1200 }}
                                        tableLayout={"fixed"}
                                        pagination={{ defaultPageSize: 5 }}
                                    />
                                    <style>
                                        {`
                                            .custom-filter-dropdown {
                                            padding: 8px;
                                            border-radius: 6px;
                                            background: #fff;
                                            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                                            }
                                            .custom-filter-dropdown input {
                                            width: 130px;
                                            margin-right: 8px;
                                            }
                                            .highlight {
                                            color: #f50;
                                            }
                                        `}
                                    </style>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
