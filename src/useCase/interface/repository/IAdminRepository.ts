import { IAdmin } from "../../../domain/admin";
import { IUser } from "../../../domain/user";

export interface IAdminRepository {
  findAdmin(email: string): Promise<IAdmin | null>;
  getAllUsers(): Promise<IUser[] | null>;
  countUsers():Promise<number | null>;
  countTrainers():Promise<number |null>
}