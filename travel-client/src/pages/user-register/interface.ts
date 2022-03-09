import { IUserInfo } from "../user-info/interface";

export interface IRegisterInfo extends IUserInfo {
    userCheckPassword: string;
}
