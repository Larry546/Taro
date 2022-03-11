import { getUser } from "../system/tools/user";

export function login(target, loginInfo) {
    return target.http.post("/user/login", loginInfo);
}

export function getUserInfo(target) {
    let uid = getUser();
    if (!uid) {
        return {};
    }
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

export function getSpotList(target) {
    return target.http.get("/spot/list");
}

export function getSpotTicket(target, spotId) {
    return target.http.get(`/ticket/listBySpot/${spotId}`);
}

export function getUserFav(target) {
    let uid = getUser();
    if (!uid) {
        return;
    }
    return target.http.get(`/spot/listByUser/${uid}`);
}

export function getSpotRate(target, spotId) {
    return target.http.get(`/comment/rateBySpot/${spotId}`);
}

export function isUserFav(target, spotId) {
    let uid = getUser();
    if (!uid) {
        return false;
    }
    let data = {
        uid: uid,
        spotId: spotId,
    };
    return target.http.get("/favorite/isFav", data);
}

export function getSpotByType(target, type) {
    return target.http.get(`/spot/listByType/"${type}"`);
}

export function getSpotByName(target, keyword) {
    return target.http.get(`/spot/listByName/${keyword}`);
}
