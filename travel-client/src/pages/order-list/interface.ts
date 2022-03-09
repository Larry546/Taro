import { IOrderInfo } from "../order-detail/interface";

export interface IOrderListState {
    orderList: Array<IOrderTime>;
}

export interface IOrderTime {
    orderCreatetime: string;
    list: Array<IOrderInfo>;
}
