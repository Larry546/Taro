import { IPassengerInfo } from "../order-detail/interface";

export interface IBookingState {
    calendarOpen: boolean;
    selectedDate: string;
    contact: string;
    orderTicketList?: Array<{
        ticketId: number;
        ticketName: string;
        ticketPrice: number;
        ticketNum: number;
        passenger?: Array<IPassengerInfo>;
    }>;
}
