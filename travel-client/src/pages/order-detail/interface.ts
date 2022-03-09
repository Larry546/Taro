import { IPassengerInfo } from "src/common/traveler/edit/interface";
import { IOrderTicketInfo } from "../booking/interface";
import { ISpotInfo } from "../spot-detail/interface";

export interface IOrderDetailState {
    passengerlist: Array<IPassengerInfo>;
    orderInfo: IOrderInfo;
    spotInfo: ISpotInfo;
}

export interface IOrderInfo {
    orderId: number;
    orderSpotname: string; //景点名
    orderTotal: number;
    orderStatus: string;
    orderCreateTime: string;
    orderuseTime: string;
    orderTicket: Array<IOrderTicketInfo>;
}
