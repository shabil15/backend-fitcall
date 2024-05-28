import { IUser } from "../../../domain/user";
import { ITrainer } from "../../../domain/trainer";


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

export interface IUserResponse<T = IUser| IUser[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}

export interface trainerResponseData extends StoreData{
  mobile?:string,
  profile_img? : string,
  language?:string,
  specialisation?:string,
  description?: string,
  joinDate? : Date
}


export interface IforgotPassword {
  email : string;
  password : string
}

export interface RequesEmailData{
  name : string;
  email: string;
}

export interface ITrainerResponse<T = ITrainer| ITrainer[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string;
  total?: number;
}

export interface paymentDatas{
  _id?:string;
  name?:string;
  amount?:number;
  transactionId?:string;
  userId?:string;
  email?:string;
  message?:string;
}