import http from "./tools";

export function getSpotList() {
    let url = "/spot/list";
    return http.get(url);
}

export function getTicketList(spotId: number) {
    let url = `/ticket/listBySpot/${spotId}`;
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
