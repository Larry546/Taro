import { ISpotInfo } from "../spot-detail/interface";

export interface IFavState {
    spotList?: Array<IFavSpotInfo>;
}

export interface IFavSpotInfo extends ISpotInfo {
    favoriteId: number;
}
