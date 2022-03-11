export interface ISpotState {
    introOpen: boolean;
    isFav?: boolean;
    spotInfo?: ISpotInfo;
}

export interface ISpotInfo {
    spotId: number;
    spotName: string;
    spotAddress?: string;
    spotOpenhour?: string;
    spotOffhour?: string;
    spotRateScore?: number;
    spotRateNum?: number;
    spotImageurl?: string;
    spotType?: Array<string>;
    spotIntro?: string;
    ticketList?: Array<ITicketInfo>;
}

export interface ITicketInfo {
    ticketId: number;
    ticketName: string;
    ticketPrice: number;
    ticketRequest?: string;
    ticketTag?: Array<string>;
}
