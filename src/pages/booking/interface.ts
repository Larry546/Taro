import { IPassengerInfo } from "../../common/traveler/edit/interface";

export interface IBookingState {
    calendarOpen: boolean;
    selectedDate: string;
    listOpen: boolean;
    contact: string;
    orderTicketList?: Array<IOrderTicketInfo>;
    currentTicket?: IOrderTicketInfo;
}

export interface IOrderTicketInfo {
    ticketId: number;
    ticketName: string;
    ticketPrice: number;
    ticketNum: number;
    passenger?: Array<IPassengerInfo>;
}
