import { IAdmin } from "../../../domain/admin";
import { IAdminRepository } from "../../../useCase/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";
import { findAdmin } from "./admin/findAdmin";

export class AdminRepository implements IAdminRepository {
  constructor (private readonly adminModel:typeof AdminModel) { }

   async findAdmin(email: string): Promise<IAdmin | null> {
   return findAdmin(email,this.adminModel);   
  }
}