export interface IFMenuBase {
    key: string;
    title: string;
    component?: string;
    query?: string;
    route?: string;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: "/app/dashboard/index", title: "首页", component: "Dashboard" },
        {
            key: "/app/spot",
            title: "景点管理",
            subs: [
                {
                    key: "/app/spot/list",
                    title: "景点列表",
                    component: "SpotList",
                },
                {
                    key: "/app/spot/edit",
                    title: "景点编辑",
                    component: "SpotEdit",
                },
                {
                    key: "/app/spot/ticket",
                    title: "门票编辑",
                    component: "TicketEdit",
                },
            ],
        },
        {
            key: "/app/user",
            title: "用户管理",
            subs: [
                {
                    key: "/app/user/list",
                    title: "用户列表",
                    component: "UserList",
                },
            ],
        },
        {
            key: "/app/order",
            title: "订单管理",
            subs: [
                {
                    key: "/app/order/list",
                    title: "订单列表",
                    component: "OrderList",
                },
                {
                    key: "/app/order/edit",
                    title: "订单编辑",
                    component: "OrderEdit",
                },
            ],
        },
        {
            key: "/app/extension",
            title: "系统设置",
            subs: [
                {
                    key: "/app/extension/env",
                    title: "环境配置",
                    component: "Env",
                },
                {
                    key: "/login",
                    title: "退出登陆",
                },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};

export default menus;
