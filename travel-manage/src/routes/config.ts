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
            key: "/app/ui",
            title: "UI",
            subs: [
                { key: "/app/ui/buttons", title: "按钮", component: "Buttons" },
                { key: "/app/ui/icons", title: "图标", component: "Icons" },
                { key: "/app/ui/spins", title: "加载中", component: "Spins" },
                { key: "/app/ui/modals", title: "对话框", component: "Modals" },
                { key: "/app/ui/notifications", title: "通知提醒框", component: "Notifications" },
                { key: "/app/ui/tabs", title: "标签页", component: "Tabs" },
                { key: "/app/ui/banners", title: "轮播图", component: "Banners" },
                { key: "/app/ui/wysiwyg", title: "富文本", component: "WysiwygBundle" },
                { key: "/app/ui/drags", title: "拖拽", component: "Drags" },
                { key: "/app/ui/gallery", title: "画廊", component: "Gallery" },
            ],
        },
        {
            key: "/app/animation",
            title: "动画",
            subs: [
                {
                    key: "/app/animation/basicAnimations",
                    title: "基础动画",
                    component: "BasicAnimations",
                },
                {
                    key: "/app/animation/exampleAnimations",
                    title: "动画案例",
                    component: "ExampleAnimations",
                },
            ],
        },
        {
            key: "/app/table",
            title: "表格",
            subs: [
                { key: "/app/table/basicTable", title: "基础表格", component: "BasicTable" },
                { key: "/app/table/advancedTable", title: "高级表格", component: "AdvancedTable" },
                {
                    key: "/app/table/asynchronousTable",
                    title: "异步表格",
                    component: "AsynchronousTable",
                },
            ],
        },
        {
            key: "/app/chart",
            title: "图表",
            subs: [
                { key: "/app/chart/echarts", title: "echarts", component: "Echarts" },
                { key: "/app/chart/recharts", title: "recharts", component: "Recharts" },
            ],
        },
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
    others: [], // 非菜单相关路由
};

export default menus;
