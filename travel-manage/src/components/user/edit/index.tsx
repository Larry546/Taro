import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { formItemLayout, tailFormItemLayout } from "../../basic-component/form";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { IUserEditState } from "./interface";
import { getUserInfo as _getUserInfo, saveUser as _saveUser } from "../../../service/api";

const Item = Form.Item;

export default class UserEdit extends React.PureComponent<any> {
    state: IUserEditState;
    formref: any;
    userId: number;
    constructor(props: any) {
        super(props);
        this.userId = 0;
        this.state = {
            userAccount: "",
            userPassword: "",
            userContact: "",
            userNickname: "",
        };
        this.getParams();
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getParams = () => {
        const history = this.props.history;
        const location = history.location;
        if (location && location.state) {
            this.userId = location.state.userId;
        }
    };

    getUserInfo = async () => {
        let res = await _getUserInfo(this.userId);
        if (res) {
            let info = {
                userAccount: res.userAccount,
                userPassword: res.userPassword,
                userContact: res.userContact,
                userNickname: res.userNickname,
            };
            this.formref.setFieldsValue(info);

            this.setState(info);
        }
    };

    submit = async () => {
        let info = {
            userId: this.userId,
            ...this.state,
        };
        try {
            const values = await this.formref.validateFields();
            console.log("🚀 ~ file: index.tsx ~ line 70 ~ OrderEdit ~ submit= ~ values", values);
            let res = await _saveUser(info);
            if (res) {
                message.success("保存成功!");
            } else {
                message.error("网络错误，保存失败!");
            }
        } catch (errorInfo) {
            console.log(
                "🚀 ~ file: index.tsx ~ line 68 ~ UserEdit ~ submit= ~ errorInfo",
                errorInfo
            );
        }
    };

    render() {
        const { userAccount, userPassword, userContact, userNickname } = this.state;
        return (
            <div>
                <BreadcrumbCustom breads={["用户管理", "用户编辑"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={"用户编辑"} bordered={false}>
                                {this.userId !== 0 ? (
                                    <div className="wrap">
                                        <Form
                                            {...formItemLayout}
                                            name="UserEdit"
                                            scrollToFirstError
                                            style={{ width: 500 }}
                                            ref={ref => (this.formref = ref)}
                                        >
                                            <Item
                                                name={"userAccount"}
                                                label={"用户名"}
                                                rules={[
                                                    { required: true, message: "请输入用户名!" },
                                                ]}
                                            >
                                                <Input
                                                    value={userAccount}
                                                    disabled={true}
                                                    onChange={e => {
                                                        this.setState({
                                                            userAccount: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item
                                                name={"userPassword"}
                                                label={"用户密码"}
                                                rules={[
                                                    { required: true, message: "请输入用户密码!" },
                                                ]}
                                            >
                                                <Input
                                                    value={userPassword}
                                                    onChange={e => {
                                                        this.setState({
                                                            ticketPrice: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item name={"userContact"} label={"用户联系方式"}>
                                                <Input
                                                    value={userContact}
                                                    onChange={e => {
                                                        this.setState({
                                                            userContact: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Item>
                                            <Item name={"userNickname"} label={"用户昵称"}>
                                                <Input
                                                    value={userNickname}
                                                    onChange={e => {
                                                        this.setState({
                                                            userNickname: e.target.value,
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
                                    <span>暂不支持管理员创建用户</span>
                                )}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
