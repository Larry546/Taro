import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { getTicketInfo as _getTicketInfo } from "../../../service/api";
import { formItemLayout, tailFormItemLayout } from "../../basic-component/form";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { ITicketState } from "./interface";

const Item = Form.Item;

export default class TicketEdit extends React.PureComponent<any> {
    state: ITicketState;
    formref: any;
    spotId: number | undefined;
    ticketId: number;
    constructor(props: any) {
        super(props);
        this.ticketId = 0;
        this.state = {
            ticketName: "",
            ticketPrice: undefined,
            ticketRequest: "",
            ticketTag: "",
            spotId: undefined,
        };
        this.getParams();
    }

    componentDidMount() {
        this.getTicketInfo();
    }

    getParams = () => {
        const history = this.props.history;
        const location = history.location;
        if (location && location.state) {
            this.spotId = location.state.spotId;
            this.ticketId = location.state.ticketId;
        }
    };

    getTicketInfo = async () => {
        let res = await _getTicketInfo(this.ticketId);
        if (res) {
            let info = {
                ticketName: res.ticketName,
                ticketPrice: res.ticketPrice,
                ticketRequest: res.ticketRequest,
                ticketTag: res.ticketTag,
                spotId: res.spotId || this.spotId,
            };
            this.formref.setFieldsValue(info);

            this.setState(info);
        }
    };

    render() {
        const { ticketName, ticketPrice, ticketRequest, ticketTag, spotId } = this.state;
        return (
            <div>
                <BreadcrumbCustom breads={["景点管理", "门票编辑"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={"门票编辑"} bordered={false}>
                                <div className="wrap">
                                    <Form
                                        {...formItemLayout}
                                        name="spotedit"
                                        scrollToFirstError
                                        style={{ width: 500 }}
                                        ref={ref => (this.formref = ref)}
                                    >
                                        <Item
                                            name={"ticketName"}
                                            label={"门票名称"}
                                            rules={[{ required: true, message: "请输入门票名称!" }]}
                                        >
                                            <Input
                                                value={ticketName}
                                                onChange={e => {
                                                    this.setState({
                                                        ticketName: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"ticketPrice"}
                                            label={"门票价格"}
                                            rules={[{ required: true, message: "请输入门票价格!" }]}
                                        >
                                            <Input
                                                value={ticketPrice}
                                                onChange={e => {
                                                    this.setState({
                                                        ticketPrice: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item name={"ticketRequest"} label={"购买要求"}>
                                            <Input.TextArea
                                                rows={4}
                                                value={ticketRequest}
                                                onChange={e => {
                                                    this.setState({
                                                        ticketRequest: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item name={"ticketTag"} label={"门票标签"}>
                                            <Input
                                                value={ticketTag}
                                                onChange={e => {
                                                    this.setState({
                                                        ticketTag: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotId"}
                                            label={"景点ID"}
                                            rules={[{ required: true, message: "请输入景点ID!" }]}
                                        >
                                            <Input
                                                value={spotId}
                                                onChange={e => {
                                                    this.setState({
                                                        spotId: e.target.value,
                                                    });
                                                }}
                                            />
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
                                            <Button type="primary">提交</Button>
                                        </Item>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
