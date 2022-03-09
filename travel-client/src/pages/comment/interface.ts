import { ISpotInfo } from "../spot-detail/interface";

export interface ICommentState {
    spotInfo: ISpotInfo;
    commentRate: number;
    commentText: string;
}
