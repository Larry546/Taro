import { Card, Col, Row } from "antd";
import React from "react";
import Table from "../basic-component/tables/SearchTable";
import BreadcrumbCustom from "../basic-component/widget/BreadcrumbCustom";

export default class Order extends React.PureComponent {
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom breads={["订单管理"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="订单管理" bordered={false}>
                                <Table />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
