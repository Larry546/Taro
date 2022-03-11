import { IPassengerInfo } from "src/common/traveler/edit/interface";
import { ISpotInfo, ITicketInfo } from "../spot-detail/interface";

export interface IBookingState {
    calendarOpen: boolean;
    selectedDate: string;
    listOpen: boolean;
    detailOpen: boolean;
    contact?: string;
    spotInfo?: ISpotInfo;
    orderTicketList?: Array<IOrderTicketInfo>;
    currentTicket?: IOrderTicketInfo;
    passengerlist?: Array<IPassengerInfo>;
}

export interface IOrderTicketInfo extends ITicketInfo {
    ticketNum: number;
    passenger?: Array<number>;
}
