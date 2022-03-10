import { getUser } from "../system/tools/user";

export function login(target, loginInfo) {
    return target.http.post("/user/login", loginInfo);
}

export function getUserInfo(target) {
    return target.http.get(`/user/find/${getUser()}`);
}

export function getPassengerList(target) {
    return target.http.get(`/passenger/listByUser/${getUser()}`);
}

export function getOrderList(target, orderIndex) {
    let data = {
        uid: getUser(),
        type: orderIndex,
    };
    return target.http.get("/order/listByUser", data);
}

export function getOrderTicket(target, orderId) {
    return target.http.get(`/ticket/listByOrder/${orderId}`);
}

export function getSpotInfo(target, spotId) {
    return target.http.get(`/spot/find/${spotId}`);
}

export function getOrderInfo(target, orderId) {
    return target.http.get(`/order/find/${orderId}`);
}
