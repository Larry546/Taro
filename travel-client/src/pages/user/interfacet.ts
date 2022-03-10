import { IUserInfo } from "../user-info/interface";

export interface IUserState {
    uid: number;
    userInfo?: IUserInfo;
}
