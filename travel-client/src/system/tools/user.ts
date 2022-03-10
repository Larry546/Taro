import Taro from "@tarojs/taro";

export const setUser = uid => {
    Taro.setStorageSync("uid", uid);
};

export const getUser = () => {
    Taro.getStorageSync("uid");
};
