import { ISpotInfo } from "src/pages/spot-detail/interface";
export interface ISpotCard {
    index: number;
    deleteFav?: any;
    spotInfo: ISpotInfo;
    fromFav?: boolean;
}
