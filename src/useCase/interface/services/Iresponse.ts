import { IUser } from "../../../domain/user";


// export interface Response<T = IUser| IUser[]|string> {
//   status: number;
//   success: boolean;
//   message?: string;
//   data?: T;
// }


export interface StoreData {
  _id?: string;
  name: string;
  email : string
}

export interface IResponse<T = StoreData | string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}

export interface IforgotPassword {
  email : string;
  password : string
}
