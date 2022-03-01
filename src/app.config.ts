export default defineAppConfig({
    pages: ["pages/index/index", "pages/favorite/index", "pages/user/index"],
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "Travel",
        navigationBarTextStyle: "black",
    },
    tabBar: {
        color: "#666",
        selectedColor: "#b4282d",
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
