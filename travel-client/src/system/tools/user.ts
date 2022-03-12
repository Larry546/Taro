import Taro from "@tarojs/taro";

export const setUser = uid => {
    Taro.setStorageSync("uid", uid);
};

export const getUser = () => {
    return Taro.getStorageSync("uid");
};

export const setToken = token => {
    Taro.setStorageSync("token", token);
};

export const getToken = () => {
    return Taro.getStorageSync("token");
};
