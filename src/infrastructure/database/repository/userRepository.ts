import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../../useCase/interface/repository/IUserRepository";
import { IforgotPassword,StoreData } from "../../../useCase/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { forgotPassword } from "./user/forgotPassword";


export class UserRepository implements IUserRepository {
  constructor(private readonly usersModel:typeof UserModel) {}

   async createUser(newUser: IUser): Promise<IUser> {
      return createUser(newUser,this.usersModel);
  }

   async findUser(email: string): Promise<IUser | null> {
      return findUser(email,this.usersModel);
  }

  async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
    return forgotPassword(newPassword, this.usersModel);
  }
}