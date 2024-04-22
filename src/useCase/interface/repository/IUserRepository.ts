import { IUser } from "../../../domain/user";
import { IforgotPassword,StoreData } from "../services/Iresponse";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser>;
  findUser(email: string): Promise<IUser | null>;
  forgotPassword(newPassword:IforgotPassword): Promise<StoreData>
}
