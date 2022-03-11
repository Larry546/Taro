import { ISpotInfo } from "../spot-detail/interface";

export interface IState {
    searchValue: string;
    spotList?: Array<ISpotInfo>;
}
