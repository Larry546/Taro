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
import { ColumnProps } from "antd/lib/table";
import React from "react";
import Highlighter from "react-highlight-words";
import {
    getUserList as _getUserList,
    deleteUser as _deleteUser,
    unDeleteUser as _unDeleteUser,
} from "../../../service/api";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { IUserState } from "./interface";

export default class UserList extends React.PureComponent<any> {
    state: IUserState;
    searchInput: any;
    constructor(props: any) {
        super(props);
        this.state = {
            userlist: [],
            searchText: "",
            searchedColumn: "",
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        let res = await _getUserList();
        let list = res || [];
        for (let user of list) {
            user.key = user.userId;
        }
        this.setState({
            userlist: list,
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

    deleteUser = async (userId: number) => {
        let res = await _deleteUser(userId);
        if (res) {
            this.getList();
            message.success("删除成功!");
        } else {
            message.error("删除失败");
        }
    };

    undeleteUser = async (userId: number) => {
        let res = await _unDeleteUser(userId);
        if (res) {
            this.getList();
            message.success("恢复成功!");
        } else {
            message.error("恢复失败");
        }
    };

    render() {
        const { userlist } = this.state;
        const columns: ColumnProps<any>[] = [
            {
                title: "用户ID",
                dataIndex: "userId",
                key: "1",
                fixed: "left",
                width: 80,
            },
            {
                title: "用户名",
                dataIndex: "userAccount",
                key: "2",
                ...this.getColumnSearchProps("userAccount"),
            },
            {
                title: "密码",
                dataIndex: "userPassword",
                key: "3",
            },
            {
                title: "昵称",
                dataIndex: "userNickname",
                key: "4",
            },
            {
                title: "联系方式",
                dataIndex: "userContact",
                key: "5",
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
                                            pathname: "/app/user/edit",
                                            state: {
                                                userId: record.userId,
                                            },
                                        });
                                    }}
                                >
                                    编辑
                                </a>{" "}
                                <Popconfirm
                                    title={"确定要删除该用户?"}
                                    onConfirm={() => {
                                        this.deleteUser(record.userId);
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={"middle"}>
                                <span>已删除</span>
                                <Popconfirm
                                    title={"确定要恢复该用户?"}
                                    onConfirm={() => {
                                        this.undeleteUser(record.userId);
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
        return (
            <div className="gutter-example">
                <BreadcrumbCustom breads={["用户管理", "用户列表"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="用户管理" bordered={false}>
                                <BaseTable
                                    columns={columns}
                                    dataSource={userlist}
                                    scroll={{ x: 1200 }}
                                    tableLayout={"fixed"}
                                    pagination={{ defaultPageSize: 5 }}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
