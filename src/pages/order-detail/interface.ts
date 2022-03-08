import { ITicketInfo } from "../spot-detail/interface";
import { IPassengerInfo } from "../../common/traveler/edit/interface";

export interface IOrderTime {
    orderCreateTime: string;
    list: Array<IOrderInfo>;
}

export interface IOrderInfo {
    orderId: number;
    orderName: string; //景点名+票名拼接
    orderTotal: number;
    orderStatus: string;
    orderCreateTime: string;
    orderuseTime: string;
    orderTicket: Array<IOrderTicketInfo>;
}

export interface IOrderTicketInfo extends ITicketInfo {
    ticketNum: number;
    ticketPassenger?: Array<IPassengerInfo>;
}
