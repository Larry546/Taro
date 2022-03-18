import { Button, Card, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { getSpotInfo as _getSpotInfo } from "../../../service/api";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { ISpotEditState } from "./interfacet";
import { formItemLayout, tailFormItemLayout } from "../../basic-component/form";

const Item = Form.Item;

export default class SpotEdit extends React.PureComponent<any> {
    state: ISpotEditState;
    spotId: number;
    formref: any;
    constructor(props: any) {
        super(props);
        this.spotId = 0;
        this.state = {
            spotName: "",
            spotAddress: "",
            spotOpenhour: "00:00:00",
            spotOffhour: "00:00:00",
            spotImageurl: "",
            spotType: "",
            spotIntro: "",
        };
        this.getSpotId();
    }

    componentDidMount() {
        this.getSpotInfo();
    }

    getSpotId = () => {
        const history = this.props.history;
        const location = history.location;
        if (location && location.state) {
            this.spotId = location.state.spotId;
        }
    };

    getSpotInfo = async () => {
        let res = await _getSpotInfo(this.spotId);
        if (res) {
            let date = new Date().toLocaleDateString() + " ";
            let info = {
                spotName: res.spotName,
                spotAddress: res.spotAddress,
                spotOpenhour: moment(date + res.spotOpenhour),
                spotOffhour: moment(date + res.spotOffhour),
                spotImageurl: res.spotImageurl,
                spotType: res.spotType,
                spotIntro: res.spotIntro,
            };
            this.formref.setFieldsValue(info);
            this.setState(info);
        }
    };

    render() {
        const {
            spotName,
            spotAddress,
            spotOpenhour,
            spotOffhour,
            spotImageurl,
            spotType,
            spotIntro,
        } = this.state;
        return (
            <div>
                <BreadcrumbCustom breads={["景点管理", "景点编辑"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={"景点编辑"} bordered={false}>
                                <div className="wrap">
                                    <Form
                                        {...formItemLayout}
                                        name="SpotEdit"
                                        scrollToFirstError
                                        style={{ width: 500 }}
                                        ref={ref => (this.formref = ref)}
                                    >
                                        <Item
                                            name={"spotName"}
                                            label={"景点名称"}
                                            rules={[{ required: true, message: "请输入景点名称!" }]}
                                        >
                                            <Input
                                                value={spotName}
                                                onChange={e => {
                                                    this.setState({
                                                        spotName: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotAddress"}
                                            label={"景点地址"}
                                            rules={[{ required: true, message: "请输入景点地址!" }]}
                                        >
                                            <Input
                                                value={spotAddress}
                                                onChange={e => {
                                                    this.setState({
                                                        spotAddress: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotOpenhour"}
                                            label={"景点开放时间"}
                                            rules={[
                                                { required: true, message: "请输入景点开放时间!" },
                                            ]}
                                        >
                                            <TimePicker
                                                value={moment(spotOpenhour)}
                                                onChange={(time, dateString) => {
                                                    this.setState({
                                                        spotOpenhour: dateString,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotOffhour"}
                                            label={"景点关闭时间"}
                                            rules={[
                                                { required: true, message: "请输入景点关闭时间!" },
                                            ]}
                                        >
                                            <TimePicker
                                                value={moment(spotOffhour)}
                                                onChange={(time, dateString) => {
                                                    this.setState({
                                                        spotOffhour: dateString,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotImageurl"}
                                            label={"景点图片URL"}
                                            rules={[{ required: true, message: "请输入景点图片!" }]}
                                        >
                                            <Input
                                                value={spotImageurl}
                                                onChange={e => {
                                                    this.setState({
                                                        spotImageurl: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotType"}
                                            label={"景点类型"}
                                            rules={[{ required: true, message: "请输入景点类型!" }]}
                                        >
                                            <Input
                                                value={spotType}
                                                onChange={e => {
                                                    this.setState({
                                                        spotType: e.target.value,
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item
                                            name={"spotIntro"}
                                            label={"景点简介"}
                                            rules={[{ required: true, message: "请输入景点简介!" }]}
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                value={spotIntro}
                                                onChange={e => {
                                                    this.setState({
                                                        spotIntro: e.target.value,
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
