import React from "react";
import { Row, Col, Card, Timeline } from "antd";
import BreadcrumbCustom from "../basic-component/widget/BreadcrumbCustom";
import EchartsViews from "./EchartsViews";
import {
    EnvironmentOutlined,
    CreditCardOutlined,
    UserOutlined,
    FileDoneOutlined,
    SyncOutlined,
} from "@ant-design/icons";

import {
    getSpotCount as _getSpotCount,
    getUserCount as _getUserCount,
    getTicketCount as _getTicketCount,
    getOrderCount as _getOrderCount,
} from "../../service/api";

interface State {
    spotNum: number;
    ticketNum: number;
    userNum: number;
    orderNum: number;
}

export default class Dashboard extends React.PureComponent {
    state: State;
    constructor(props: any) {
        super(props);
        this.state = {
            spotNum: 0,
            ticketNum: 0,
            userNum: 0,
            orderNum: 0,
        };
    }

    componentDidMount() {
        this.getNum();
    }

    getNum = async () => {
        let spotNum = await _getSpotCount();
        let ticketNum = await _getTicketCount();
        let userNum = await _getUserCount();
        let orderNum = await _getOrderCount();
        this.setState({
            spotNum,
            ticketNum,
            userNum,
            orderNum,
        });
    };

    render() {
        const { spotNum, ticketNum, userNum, orderNum } = this.state;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <EnvironmentOutlined className="text-2x text-blue" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">景点</div>
                                        <h2>{spotNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <UserOutlined type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">用户</div>
                                        <h2>{userNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <CreditCardOutlined className="text-2x text-dark" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">门票</div>
                                        <h2>{ticketNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <FileDoneOutlined className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">订单</div>
                                        <h2>{orderNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务</h3>
                                    <small>10个已经完成，2个待完成</small>
                                </div>
                                <span className="card-tool">
                                    <SyncOutlined />
                                </span>
                                <Timeline>
                                    <Timeline.Item color="green">系统设计</Timeline.Item>
                                    <Timeline.Item color="green">系统实现</Timeline.Item>
                                    <Timeline.Item color="green">
                                        <p>联调接口</p>
                                        <p>功能验收</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="red">访问量统计</Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计（假数据）</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <span className="card-tool">
                                    <SyncOutlined type="sync" />
                                </span>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
