import React from "react";
import { Button, Form, Input } from "antd";
import { RouteComponentProps } from "react-router";
import { FormProps } from "antd/lib/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

const Login = (props: LoginProps) => {
    const { history } = props;
    sessionStorage.setItem("travel-user", "");

    const handleSubmit = (values: any) => {
        if (checkUser(values)) {
            sessionStorage.setItem("travel-user", values.userName);
            history.push("/app/dashboard/index");
        }
    };
    const checkUser = (values: any) => {
        const users = [["admin", "admin"]];
        return users.some(user => user[0] === values.userName && user[1] === values.password);
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-logo">
                    <span>Travel Admin</span>
                </div>
                <Form onFinish={handleSubmit} style={{ maxWidth: "300px" }}>
                    <FormItem
                        name="userName"
                        rules={[{ required: true, message: "请输入用户名!" }]}
                    >
                        <Input prefix={<UserOutlined size={13} />} />
                    </FormItem>
                    <FormItem name="password" rules={[{ required: true, message: "请输入密码!" }]}>
                        <Input prefix={<LockOutlined size={13} />} type="password" />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ width: "100%" }}
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
};

export default Login;
