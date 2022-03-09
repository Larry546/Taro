import { IOrderInfo } from "../order-detail/interface";

export interface IOrderListState {
    orderList: Array<IOrderTime>;
}

export interface IOrderTime {
    orderCreateTime: string;
    list: Array<IOrderInfo>;
}
