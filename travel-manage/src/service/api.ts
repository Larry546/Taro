import http from "./tools";

export function getSpotList() {
    let url = "/spot/adminList";
    return http.get(url);
}

export function getTicketList(spotId: number) {
    let url = `/ticket/adminListBySpot/${spotId}`;
    return http.get(url);
}

export function getUserList() {
    let url = `/user/list`;
    return http.get(url);
}

export function getOrderList() {
    let url = `/order/list`;
    return http.get(url);
}

export function getOrderPass(orderId: number) {
    let url = `/passenger/listByOrder/${orderId}`;
    return http.get(url);
}

export function getSpotInfo(spotId: number) {
    let url = `/spot/find/${spotId}`;
    return http.get(url);
}

export function getTicketInfo(ticketId: number) {
    let url = `/ticket/find/${ticketId}`;
    return http.get(url);
}

export function getUserInfo(userId: number) {
    let url = `/user/adminFind/${userId}`;
    return http.get(url);
}

export function getOrderInfo(orderId: number) {
    let url = `/order/find/${orderId}`;
    return http.get(url);
}

export function deleteUser(userId: number) {
    let url = `/user/delete/${userId}`;
    return http.delete(url);
}

export function unDeleteUser(userId: number) {
    let url = `/user/undelete/${userId}`;
    return http.delete(url);
}

export function deleteOrder(orderId: number) {
    let url = `/order/delete/${orderId}`;
    return http.delete(url);
}

export function unDeleteOrder(orderId: number) {
    let url = `/order/undelete/${orderId}`;
    return http.delete(url);
}

export function deleteSpot(spotId: number) {
    let url = `/spot/delete/${spotId}`;
    return http.delete(url);
}

export function unDeleteSpot(spotId: number) {
    let url = `/spot/undelete/${spotId}`;
    return http.delete(url);
}

export function deleteTicket(ticketId: number) {
    let url = `/ticket/delete/${ticketId}`;
    return http.delete(url);
}

export function unDeleteTicket(ticketId: number) {
    let url = `/ticket/undelete/${ticketId}`;
    return http.delete(url);
}

export function saveUser(userInfo: Object) {
    let url = "/user/save";
    return http.post(url, userInfo);
}

export function updateOrder(orderInfo: Object) {
    let url = "/order/update";
    return http.post(url, orderInfo);
}
