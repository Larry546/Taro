import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "./config";

const customInterceptor = chain => {
    const requestParams = chain.requestParams;

    return chain.proceed(requestParams).then(res => {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            return Promise.reject("请求资源不存在");
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            return Promise.reject("服务端出现了问题");
        } else if (res.statusCode === HTTP_STATUS.TOKEN_ERROR) {
            console.log(res.msg);
            return res.msg;
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            console.log(res.data);
            return res.data;
        }
    });
};

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
