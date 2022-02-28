import Taro from "@tarojs/taro";

export let push = (url: string, replace: boolean = false, fail?: Function, success?: Function) => {
    let option = {
        url: url,
        success: function () {
            success && success();
        },
        fail: function () {
            fail && fail();
        },
    };
    if (replace) {
        Taro.redirectTo(option);
    } else {
        Taro.navigateTo(option);
    }
};

export let pop = () => {
    Taro.navigateBack();
};
