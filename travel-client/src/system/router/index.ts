import Taro from "@tarojs/taro";

export let push = (
    url: string,
    method: string = "redirectTo",
    fail?: Function,
    success?: Function
) => {
    let option = {
        url: url,
        success: function () {
            success && success();
        },
        fail: function () {
            fail && fail();
        },
    };
    if (method === "redirectTo") {
        Taro.redirectTo(option);
    } else if (method === "navigateTo") {
        Taro.navigateTo(option);
    } else if (method === "reLaunch") {
        Taro.reLaunch(option);
    }
};

export let pop = () => {
    Taro.navigateBack();
};

export let getCurrentInstance = Taro.getCurrentInstance();
