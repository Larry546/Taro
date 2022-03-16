import React from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
    },
    {
        key: "2",
        name: "Joe Black",
        age: 42,
        address: "London No. 1 Lake Park",
    },
    {
        key: "3",
        name: "Jim Green",
        age: 32,
        address: "Sidney No. 1 Lake Park",
    },
    {
        key: "4",
        name: "Jim Red",
        age: 32,
        address: "London No. 2 Lake Park",
    },
];

class SearchTable extends React.Component {
    state = {
        filterDropdownVisible: false,
        data,
        searchText: "",
        filtered: false,
        selectedRowKeys: [],
    };
    searchInput: any;
    onInputChange = (e: any) => {
        this.setState({ searchText: e.target.value });
    };
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, "gi");
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data
                .map(record => {
                    const match = record.name.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        name: (
                            <span>
                                {record.name
                                    .split(reg)
                                    .map((text, i) =>
                                        i > 0
                                            ? [<span className="highlight">{match[0]}</span>, text]
                                            : text
                                    )}
                            </span>
                        ),
                    };
                })
                .filter(record => !!record),
        });
    };
    onSelectChange = (selectedRowKeys: string[] | number[]) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection: any = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns: ColumnProps<any>[] = [
            {
                title: "Id",
                dataIndex: "age",
                key: "1",
                fixed: "left",
                width: 100,
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => (this.searchInput = ele)}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Search
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <SearchOutlined
                        style={{ color: this.state.filtered ? "#1890ff" : undefined }}
                    />
                ),

                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible: boolean) => {
                    this.setState({ filterDropdownVisible: visible }, () => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput && this.searchInput.focus();
                            }, 100);
                        }
                    });
                },
            },
            {
                title: "Id3",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Id4",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Id5",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Id6",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Id7",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Id8",
                dataIndex: "age",
                key: "1",
            },
            {
                title: "Age",
                dataIndex: "age",
                key: "age",
            },
            {
                title: "Address",
                dataIndex: "address",
                key: "address",
                filters: [
                    {
                        text: "London",
                        value: "London",
                    },
                    {
                        text: "New York",
                        value: "New York",
                    },
                ],
                onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
            },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 100,
                render: () => <span>action</span>,
            },
        ];
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    expandedRowRender={record => <p>{record.address}</p>}
                    scroll={{ x: 1200 }}
                    rowSelection={rowSelection}
                />
                <style>{`
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
                `}</style>
            </div>
        );
    }
}

export default SearchTable;
