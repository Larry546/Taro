import { getUser } from "../system/tools/user";

export function login(target, loginInfo) {
    return target.http.post("/user/login", loginInfo);
}

export function logout(target) {
    return target.http.post("/user/logout");
}

export function register(target, userInfo) {
    return target.http.post("/user/register", userInfo);
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
        return [];
    }
    return target.http.get(`/spot/listByUser/${uid}`);
}

export function getSpotRate(target, spotId) {
    return target.http.get(`/comment/rateBySpot/${spotId}`);
}

export function isUserFav(target, spotId) {
    let uid = getUser();
    if (!uid) {
        return 0;
    }
    let data = {
        uid: uid,
        spotId: spotId,
    };
    return target.http.get("/favorite/isFav", data);
}

export function getSpotByType(target, type) {
    return target.http.get(`/spot/listByType/${type}`);
}

export function getSpotByName(target, keyword) {
    return target.http.get(`/spot/listByName/${keyword}`);
}

export function deletePassenger(target, passId) {
    return target.http.delete(`/passenger/delete/${passId}`);
}

export function savePassenger(target, passInfo) {
    let pass = passInfo;
    let uid = getUser();
    if (!uid) {
        return false;
    }
    pass.userId = uid;
    return target.http.post("/passenger/save", pass);
}

export function deFav(target, favoriteId) {
    return target.http.delete(`/favorite/delete/${favoriteId}`);
}

export function onFav(target, spotId) {
    let data = {
        spotId: spotId,
        userId: getUser(),
    };
    return target.http.post("/favorite/save", data);
}

export function saveComment(target, commentInfo) {
    let comment = commentInfo;
    let uid = getUser();
    if (!uid) {
        return false;
    }
    comment.userId = uid;
    return target.http.post("/comment/save", comment);
}

export function deleteOrder(target, orderId) {
    return target.http.delete(`/order/delete/${orderId}`);
}

export function createOrder(target, orderInfo) {
    let uid = getUser();
    if (!uid) {
        return false;
    }
    orderInfo.userId = uid;
    return target.http.post("/order/save", orderInfo);
}

export function createDetail(target, detailInfo) {
    return target.http.post("/orderdetail/save", detailInfo);
}

export function saveUser(target, userInfo) {
    let uid = getUser();
    if (!uid) {
        return false;
    }
    userInfo.userId = uid;
    return target.http.post("/user/save", userInfo);
}

export function getRecommend(target, type: string, spotId?: number) {
    let data = {};
    if (type === "user") {
        let uid = getUser();
        if (!uid) {
            return [];
        }
        data = {
            id: uid,
            type: type,
        };
    } else if (type === "spot") {
        data = {
            id: spotId,
            type: type,
        };
    }
    return target.http.get(`/recommend/get`, data);
}
