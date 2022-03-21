import Taro from "@tarojs/taro";
import getBaseUrl from "./tools/baseUrl";
import interceptors from "./tools/interceptors";
import { getToken } from "../tools/user";

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class httpRequest {
    baseOptions(params, method = "GET") {
        let { url, data } = params;
        const BASE_URL = getBaseUrl();
        let contentType = "application/json";
        contentType = params.contentType || contentType;
        const option: any = {
            url: BASE_URL + url,
            data: data,
            method: method,
            header: {
                "content-type": contentType,
                token: getToken(),
            },
        };
        return Taro.request(option).catch(res => {
            if (res.status === 401) {
                Taro.setStorageSync("uid", "");
                Taro.setStorageSync("token", "");
            }
        });
    }

    get(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option);
    }

    post(url, data, contentType) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }

    put(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "PUT");
    }

    delete(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "DELETE");
    }
}

export default new httpRequest();
