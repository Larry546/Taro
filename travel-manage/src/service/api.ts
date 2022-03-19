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
