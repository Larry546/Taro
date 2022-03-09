export interface IEditProps {
    passengerInfo: IPassengerInfo;
    onSave: Function;
}

export interface IPassengerInfo {
    passengerId?: number;
    passengerName?: string;
    passengerNumber?: string;
    passengerSex?: string;
    passengerBirth?: string;
}
