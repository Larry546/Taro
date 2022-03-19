import { Button, Card, Col, DatePicker, Form, Input, message, Row } from "antd";
import React from "react";
import { formItemLayout, tailFormItemLayout } from "../../basic-component/form";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { IOrderEditState } from "./interface";
import { getOrderInfo as _getOrderInfo, updateOrder as _updateOrder } from "../../../service/api";
import moment from "moment";

const Item = Form.Item;

export default class OrderEdit extends React.PureComponent<any> {
    state: IOrderEditState;
    formref: any;
    orderId: number;
    constructor(props: any) {
        super(props);
        this.orderId = 0;
        this.state = {
            orderUsetime: "",
            orderTotal: undefined,
            orderStatus: "",
            orderContact: "",
            orderCreatetime: "",
            spotId: undefined,
            userId: undefined,
        };
        this.getParams();
    }

    componentDidMount() {
        this.getOrderInfo();
    }

    getParams = () => {
        const history = this.props.history;
        const location = history.location;
        if (location && location.state) {
            this.orderId = location.state.orderId;
        }
    };

    getOrderInfo = async () => {
        let res = await _getOrderInfo(this.orderId);
        if (res) {
            let info = {
                orderUsetime: moment(res.orderUsetime),
                orderTotal: res.orderTotal,
                orderStatus: res.orderStatus,
                orderContact: res.orderContact,
                orderCreatetime: res.orderCreatetime,
                spotId: res.spotId,
                userId: res.userId,
            };
            this.formref.setFieldsValue({
                orderId: this.orderId,
                ...info,
            });
            this.setState({ ...info, orderUsetime: res.orderUsetime });
        }
    };

    submit = async () => {
        let info = {
            orderId: this.orderId,
            ...this.state,
        };
        let res = await _updateOrder(info);
        if (res) {
            message.success("保存成功!");
        } else {
            message.error("网络错误，保存失败!");
        }
    };

    render() {
        const {
            orderUsetime,
            orderTotal,
            orderStatus,
            orderContact,
            orderCreatetime,
            spotId,
            userId,
        } = this.state;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom breads={["订单管理", "订单编辑"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="订单编辑" bordered={false}>
                                {this.orderId !== 0 ? (
                                    <div className="wrap">
                                        <Form
                                            {...formItemLayout}
                                            name="OrderEdit"
                                            scrollToFirstError
                                            style={{ width: 500 }}
                                            ref={ref => (this.formref = ref)}
                                        >
                                            <Item name={"orderId"} label={"订单ID"}>
                                                <Input value={this.orderId} disabled={true} />
                                            </Item>
                                            <Item
                                                name={"orderUsetime"}
                                                label={"订单使用时间"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "请输入订单使用时间!",
                                                    },
                                                ]}
                                            >
                                                <DatePicker
                                                    value={moment(orderUsetime)}
                                                    onChange={(value, dateString) => {
                                                        this.setState({
                                                            orderUsetime: dateString,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item name={"orderTotal"} label={"总额"}>
                                                <Input value={orderTotal} disabled={true} />
                                            </Item>
                                            <Item
                                                name={"orderStatus"}
                                                label={"订单状态"}
                                                rules={[
                                                    { required: true, message: "请输入订单状态!" },
                                                ]}
                                            >
                                                <Input
                                                    value={orderStatus}
                                                    onChange={e => {
                                                        this.setState({
                                                            orderStatus: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item
                                                name={"orderContact"}
                                                label={"联系方式"}
                                                rules={[
                                                    { required: true, message: "请输入联系方式!" },
                                                ]}
                                            >
                                                <Input
                                                    value={orderContact}
                                                    onChange={e => {
                                                        this.setState({
                                                            orderContact: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item name={"orderCreatetime"} label={"创单时间"}>
                                                <Input value={orderCreatetime} disabled={true} />
                                            </Item>
                                            <Item name={"orderCreatetime"} label={"创单时间"}>
                                                <Input value={orderCreatetime} disabled={true} />
                                            </Item>
                                            <Item name={"spotId"} label={"景点ID"}>
                                                <Input value={spotId} disabled={true} />
                                            </Item>
                                            <Item name={"userId"} label={"用户ID"}>
                                                <Input value={userId} disabled={true} />
                                            </Item>
                                            <Item {...tailFormItemLayout}>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        this.props.history.goBack();
                                                    }}
                                                >
                                                    返回
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        this.submit();
                                                    }}
                                                >
                                                    提交
                                                </Button>
                                            </Item>
                                        </Form>
                                    </div>
                                ) : (
                                    <span>暂不支持管理员创单</span>
                                )}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
