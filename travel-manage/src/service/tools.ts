/**
 * http通用工具函数
 */
import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:8088";

class httpRequest {
    get(url: string, msg: string = "接口异常", config?: any) {
        return axios
            .get(BASE_URL + url, config)
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }

    post(url: string, data?: any, msg: string = "接口异常", config?: any) {
        return axios
            .post(BASE_URL + url, data, config)
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }

    delete(url: string, msg: string = "接口异常", config?: any) {
        return axios
            .delete(BASE_URL + url, config)
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                message.warn(msg);
            });
    }
}

export default new httpRequest();
