export interface ISpotState {
    introOpen: boolean;
}

export interface ISpotInfo {
    spotId: number;
    spotName: string;
    spotCity?: string;
    spotAddress?: string;
    spotOpenhour?: string;
    spotOffhour?: string;
    spotRateScore?: number;
    spotRateNum?: number;
    spotImageURL?: string;
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
