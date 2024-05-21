import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../../useCase/interface/repository/IUserRepository";
import { IforgotPassword,StoreData,paymentDatas } from "../../../useCase/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { blockUser } from "./user/blockUser";
import { forgotPassword } from "./user/forgotPassword";
import { addProfile } from "./user/addProfile";
import { updateProfile } from "./user/updateProfile";
import { payment } from "./user/payment";
import { paymentData } from "./payment/paymentData";


export class UserRepository implements IUserRepository {
  constructor(private readonly usersModel:typeof UserModel) {}

   async createUser(newUser: IUser): Promise<IUser> {
      return createUser(newUser,this.usersModel);
  }

   async findUser(email: string): Promise<IUser | null> {
      return findUser(email,this.usersModel);
  }

  async blockUser(_id: string): Promise<string | null> {
    return blockUser(_id,this.usersModel)
  }

  async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
    return forgotPassword(newPassword, this.usersModel);
  }

  async addProfile(profile_img:string,_id: string): Promise<IUser | never> {
    return addProfile(_id,profile_img,this.usersModel)
  }
  
  async updateProfile(data: Record<string, string>): Promise<IUser | never>{
    return updateProfile(data,this.usersModel)
  }

  async payment(email:string):Promise<StoreData>{
    return payment(email,this.usersModel)
}

async paymentData(email:string,amount:number,transactionId:string,userId:string):Promise<paymentDatas>{
  return paymentData(email,amount,transactionId,userId,this.usersModel);

}
 
}