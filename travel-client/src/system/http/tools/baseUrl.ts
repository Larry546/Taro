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

export default getBaseUrl;
