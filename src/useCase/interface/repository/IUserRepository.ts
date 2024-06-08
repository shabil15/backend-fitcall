import { IUser } from "../../../domain/user";
import { IforgotPassword,StoreData,paymentDatas } from "../services/Iresponse";
import { IDiet } from "../../../domain/diet";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser>;
  findUser(email: string): Promise<IUser | null>;
  blockUser(_id:string):Promise<string | null>;
  forgotPassword(newPassword:IforgotPassword): Promise<StoreData>
  addProfile(profile_img:string,_id:string): Promise<IUser | never>;
  updateProfile(data:Record<string,string>): Promise<IUser>;
  payment(email:string):Promise<StoreData>;
  paymentData(email:string,amount:number,transactionId:string,userId:string): Promise<paymentDatas>;
  updateHealth(data:Record<string,string>):Promise<IUser>;
  setTrainer(data:Record<string,string>):Promise<IUser>;
  findById(userId: string): Promise<IUser | null>;
  updateDiet(userId:string,diet:IDiet):Promise<IUser | null>;
  addTestRes(testResult:string,_id:string): Promise<IUser | never>;
}
