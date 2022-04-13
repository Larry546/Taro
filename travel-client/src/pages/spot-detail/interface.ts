export interface ISpotState {
    introOpen: boolean;
    requestOpen: boolean;
    ticket: any;
    isFav?: number;
    spotInfo?: ISpotInfo;
    recommendList?: Array<ISpotInfo>;
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
    spotType?: string;
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
