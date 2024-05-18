import { IUser } from "../../../domain/user";
import { IforgotPassword,StoreData } from "../services/Iresponse";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser>;
  findUser(email: string): Promise<IUser | null>;
  blockUser(_id:string):Promise<string | null>;
  forgotPassword(newPassword:IforgotPassword): Promise<StoreData>
  addProfile(profile_img:string,_id:string): Promise<IUser | never>;
  updateProfile(data:Record<string,string>): Promise<IUser>;
  // updateProfile(data:Record<string,string>): Promise<IUser>;
}
