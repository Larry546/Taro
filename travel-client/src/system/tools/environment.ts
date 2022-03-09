import Taro, { ENV_TYPE } from "@tarojs/taro";

export default () => {
    let env = Taro.getEnv();
    switch (env) {
        case ENV_TYPE.WEAPP:
            return "WEAPP";
        case ENV_TYPE.WEB:
            return "H5";
        default:
            return "OTHER";
    }
};
