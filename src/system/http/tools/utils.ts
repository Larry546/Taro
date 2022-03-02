import Taro from "@tarojs/taro";

/**
 * 获取当前页url
 */

export const getCurrentPageUrl = () => {
    let pages = Taro.getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let url = currentPage.route;
    return url;
};

export const pageToLogin = () => {
    let path = getCurrentPageUrl();
    if (!path.includes("userLogin")) {
        Taro.navigateTo({
            url: "/pages/userLogin/index",
        });
    }
};
