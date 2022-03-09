import Taro from "@tarojs/taro";
import confirm from "../confirm";

const shouldGoToAlert = message => {
    if (message === "" || message === null || message === undefined) return false;
    //这边做了一个功能当message中文字符串大于20就弹alert，ascii算半个字符
    const asciiLength = (message.match(/[\x00-\xff]/g) || []).length;
    const messageLength = message.length;
    const totalLength = asciiLength + (messageLength - asciiLength) * 2;
    if (totalLength > 40) {
        confirm.show({
            title: message,
            btnOK: ["知道了"],
        });
        return true;
    }
    return false;
};

export default {
    show: (message: string, duration: number = 1500) => {
        if (shouldGoToAlert(message)) return;
        Taro.showToast({
            title: message,
            duration: duration,
            icon: "none",
        });
    },
};
