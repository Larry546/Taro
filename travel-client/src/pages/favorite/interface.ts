import { ISpotInfo } from "../spot-detail/interface";

export interface IFavState {
    spotList?: Array<IFavSpotInfo>;
    recommendList?: Array<ISpotInfo>;
}

export interface IFavSpotInfo extends ISpotInfo {
    favoriteId: number;
}
