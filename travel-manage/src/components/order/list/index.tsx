import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, Table as BaseTable } from "antd";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import React from "react";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { IOrderState } from "./interface";
import { getOrderList as _getOrderList, getOrderPass } from "../../../service/api";

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
        let res = await getOrderPass(orderId);
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

    render() {
        const { orderlist, passengerlist } = this.state;
        const columns: ColumnProps<any>[] = [
            {
                title: "order_id",
                dataIndex: "orderId",
                key: "1",
                fixed: "left",
                width: 100,
            },
            {
                title: "order_usetime",
                dataIndex: "orderUsetime",
                key: "2",
                ...this.getColumnSearchProps("orderUsetime"),
            },
            {
                title: "order_total",
                dataIndex: "orderTotal",
                key: "3",
            },
            {
                title: "order_status",
                dataIndex: "orderStatus",
                key: "4",
            },
            {
                title: "order_contact",
                dataIndex: "orderContact",
                key: "5",
            },
            {
                title: "order_createtime",
                dataIndex: "orderCreatetime",
                key: "6",
            },
            {
                title: "spot_id",
                dataIndex: "spotId",
                key: "7",
                width: 100,
            },
            {
                title: "user_id",
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
                                <a>删除</a>
                            </Space>
                        ) : (
                            <span>该订单已删除</span>
                        )}
                    </div>
                ),
            },
        ];

        const passengerColumns = [
            {
                title: "ticket_id",
                dataIndex: "ticketId",
                key: "1",
            },
            {
                title: "ticket_name",
                dataIndex: "ticketName",
                key: "2",
            },
            {
                title: "passenger_id",
                dataIndex: "passengerId",
                key: "3",
            },
            {
                title: "passenger_name",
                dataIndex: "passengerName",
                key: "4",
            },
            {
                title: "passenger_number",
                dataIndex: "passengerNumber",
                key: "5",
            },
            {
                title: "passenger_sex",
                dataIndex: "passengerSex",
                key: "6",
            },
            {
                title: "passenger_birth",
                dataIndex: "passenger_birth",
                key: "7",
            },
            {
                title: "Action",
                key: "operation",
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
