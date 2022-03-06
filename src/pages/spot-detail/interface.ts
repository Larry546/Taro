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
    ticketList?: Array<ITicketInfo>;
}

export interface ITicketInfo {
    ticketId: number;
    ticketName: string;
    ticketPrice?: number;
    ticketRequest?: string;
}
