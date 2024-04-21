import { IUser } from "../../../domain/user";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser>;
  findUser(email: string): Promise<IUser | null>;
}
