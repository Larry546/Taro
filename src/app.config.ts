export default defineAppConfig({
    pages: [
        "pages/index/index",
        "pages/favorite/index",
        "pages/user/index",
        "pages/user-login/index",
        "pages/user-register/index",
        "pages/order-list/index",
        "pages/order-detail/index",
        "pages/spot-list/index",
        "pages/spot-detail/index",
        "pages/booking/index",
    ],
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "Travel",
        navigationBarTextStyle: "black",
    },
    tabBar: {
        color: "#666",
        selectedColor: "#6190e8",
        backgroundColor: "#fafafa",
        borderStyle: "black",
        list: [
            {
                text: "首页",
                pagePath: "pages/index/index",
            },
            {
                text: "收藏",
                pagePath: "pages/favorite/index",
            },
            {
                text: "个人",
                pagePath: "pages/user/index",
            },
        ],
    },
});
