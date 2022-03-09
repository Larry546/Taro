import { IPassengerInfo } from "../edit/interface";
import { IOrderTicketInfo } from "src/pages/booking/interface";

export interface IListProps {
    orderTicketInfo?: IOrderTicketInfo;
    selectTraveler?: Function;
}

export interface IListState {
    editOpened: boolean;
    currentPassenger: IPassengerInfo;
}
