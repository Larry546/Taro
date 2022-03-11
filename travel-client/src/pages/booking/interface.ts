import { IPassengerInfo } from "src/common/traveler/edit/interface";
import { ISpotInfo, ITicketInfo } from "../spot-detail/interface";

export interface IBookingState {
    calendarOpen: boolean;
    selectedDate: string;
    listOpen: boolean;
    contact: string;
    requestOpen: boolean;
    requestTicket: any;
    spotInfo?: ISpotInfo;
    orderTicketList?: Array<IOrderTicketInfo>;
    currentTicket?: IOrderTicketInfo;
    passengerlist?: Array<IPassengerInfo>;
}

export interface IOrderTicketInfo extends ITicketInfo {
    ticketNum: number;
    passenger?: Array<number>;
}
