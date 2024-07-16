import { IAdmin } from "../../../domain/admin";
import { IUser } from "../../../domain/user";
import { IAdminRepository } from "../../../useCase/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";
import { findAdmin } from "./admin/findAdmin";
import UserModel from "../model/userModel";
import TrainerModel from "../model/trainerModel";
import {getAllSubs} from './admin/getAllSubs';
import {IUserSubscription} from '../../../domain/subscription';

export class AdminRepository implements IAdminRepository {
  constructor (private readonly adminModel:typeof AdminModel) { }

   async findAdmin(email: string): Promise<IAdmin | null> {
   return findAdmin(email,this.adminModel);   
  }

  async  getAllUsers(): Promise<IUser[] | null>  {
    return await UserModel.find().lean();
  }

  async  countUsers():Promise<number | null> {
    return await UserModel.countDocuments();
  }

  async countTrainers():Promise<number |null> {
    return await TrainerModel.countDocuments();
  }

  async getAllSubs():Promise<IUserSubscription[]>{
    return getAllSubs()
  }
}