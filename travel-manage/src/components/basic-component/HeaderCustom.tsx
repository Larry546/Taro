import React, { useEffect, useState } from "react";
import screenfull from "screenfull";
import avater from "../../style/imgs/b1.jpg";
import SiderCustom from "./SiderCustom";
import { Menu, Layout, Badge, Popover } from "antd";
import { useHistory } from "react-router-dom";
import { useAlita } from "redux-alita";
import { useSwitch } from "../../utils/hooks";
import {
    ArrowsAltOutlined,
    BarsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};

const HeaderCustom = (props: HeaderCustomProps) => {
    const [user, setUser] = useState<any>();
    const [responsive] = useAlita("responsive", { light: true });
    const [visible, turn] = useSwitch();
    const history = useHistory();

    useEffect(() => {
        let storageUser = sessionStorage.getItem("travel-user") || "";
        setUser({
            user: storageUser,
        });
    }, []);

    const screenFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };
    const menuClick = (e: any) => {
        e.key === "logout" && logout();
    };
    const logout = () => {
        sessionStorage.removeItem("travel-user");
        history.push("/login");
    };
    return (
        <Header className="custom-theme header">
            {responsive?.isMobile ? (
                <Popover
                    content={<SiderCustom popoverHide={turn.turnOff} />}
                    trigger="click"
                    placement="bottomLeft"
                    visible={visible}
                    onVisibleChange={visible => (visible ? turn.turnOn() : turn.turnOff())}
                >
                    <BarsOutlined className="header__trigger custom-trigger" />
                </Popover>
            ) : props.collapsed ? (
                <MenuUnfoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            ) : (
                <MenuFoldOutlined
                    className="header__trigger custom-trigger"
                    onClick={props.toggle}
                />
            )}
            <Menu
                mode="horizontal"
                style={{ lineHeight: "64px", float: "right" }}
                onClick={menuClick}
            >
                <Menu.Item key="full">
                    <ArrowsAltOutlined onClick={screenFull} />
                </Menu.Item>
                <Menu.Item key="1">
                    <Badge style={{ marginLeft: 10 }}>
                        <NotificationOutlined />
                    </Badge>
                </Menu.Item>
                <Menu.Item>
                    <span className="avatar">
                        <img src={avater} alt="头像" />
                        <i className="on bottom b-white" />
                    </span>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default HeaderCustom;
