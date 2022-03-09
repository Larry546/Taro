export default defineAppConfig({
    pages: [
        "pages/index/index",
        "pages/favorite/index",
        "pages/user/index",
        "pages/user-info/index",
        "pages/user-login/index",
        "pages/user-register/index",
        "pages/traveler-list/index",
        "pages/order-list/index",
        "pages/order-detail/index",
        "pages/spot-list/index",
        "pages/spot-detail/index",
        "pages/comment/index",
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
        selectedColor: "#0086f6",
        backgroundColor: "#fafafa",
        borderStyle: "black",
        list: [
            {
                text: "首页",
                pagePath: "pages/index/index",
                iconPath: "./assets/tab-bar/home.png",
                selectedIconPath: "./assets/tab-bar/home-active.png",
            },
            {
                text: "收藏",
                pagePath: "pages/favorite/index",
                iconPath: "./assets/tab-bar/heart.png",
                selectedIconPath: "./assets/tab-bar/heart-active.png",
            },
            {
                text: "个人",
                pagePath: "pages/user/index",
                iconPath: "./assets/tab-bar/user.png",
                selectedIconPath: "./assets/tab-bar/user-active.png",
            },
        ],
    },
});
