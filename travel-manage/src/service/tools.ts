/**
 * http通用工具函数
 */
import axios from "axios";
import { message } from "antd";

const getBaseUrl = () => {
    let BASE_URL = "";
    if (process.env.NODE_ENV === "development") {
        //开发环境
        BASE_URL = "http://localhost:8088";
    } else {
        // 生产环境
        BASE_URL = "http://8.130.27.164:8088";
    }
    return BASE_URL;
};

class httpRequest {
    get(url: string, msg: string = "接口异常", config?: any) {
        return axios
            .get(getBaseUrl() + url, {
                ...config,
                headers: { token: sessionStorage.getItem("token") },
            })
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }

    post(url: string, data?: any, msg: string = "接口异常", config?: any) {
        return axios
            .post(getBaseUrl() + url, data, {
                ...config,
                headers: { token: sessionStorage.getItem("token") },
            })
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }

    delete(url: string, msg: string = "接口异常", config?: any) {
        return axios
            .delete(getBaseUrl() + url, {
                ...config,
                headers: { token: sessionStorage.getItem("token") },
            })
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }
}

export default new httpRequest();
