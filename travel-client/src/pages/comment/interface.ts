import { ISpotInfo } from "../spot-detail/interface";

export interface ICommentState {
    spotInfo: ISpotInfo;
    rate: number;
    edit: string;
}
