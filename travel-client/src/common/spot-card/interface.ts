import { ISpotInfo } from "src/pages/spot-detail/interface";
export interface ISpotCard {
    deleteFav?: any;
    spotInfo: ISpotInfo;
    fromFav?: boolean;
}
