import { ITrainer } from "../../../domain/trainer";
import { ITrainerRepository } from "../../../useCase/interface/repository/ITrainerRepository";
import { RequesEmailData } from "../../../useCase/interface/services/Iresponse";
import TrainerModel from "../model/trainerModel";
import { createTrainer } from "./trainer/createTrainer";
import { findTrainer } from "./trainer/findTrainer";
import { reviewRequests } from "./trainer/reviewRequests";
import { blockTrainer } from "./trainer/blockTrainer";
import { updateProfile } from "./trainer/updateProfile";
import { addProfile } from "./trainer/addProfile";
import { IUser } from "../../../domain/user";
import UserModel from "../model/userModel";
import { getClients } from "./trainer/getClients";

export class TrainerRepository implements ITrainerRepository {
  constructor(private readonly trainerModel: typeof TrainerModel, private readonly userModel: typeof UserModel) { }


  async createTrainer(newTrainer: ITrainer): Promise<string> {
    return createTrainer(newTrainer, this.trainerModel);
  }

  async findTrainer(email: string): Promise<ITrainer | null> {
    return findTrainer(email, this.trainerModel);
  }

  async reviewRequests(id: string, status: string): Promise<RequesEmailData> {
    return reviewRequests(id, status, this.trainerModel)
  }

  async blockTrainer(_id: string): Promise<string | null> {
    return blockTrainer(_id, this.trainerModel);
  }

  async updateProfile(data: Record<string, string>): Promise<ITrainer | never> {
    return updateProfile(data, this.trainerModel)
  }
  async addProfile(profile_img: string, _id: string): Promise<ITrainer | never> {
    return addProfile(_id, profile_img, this.trainerModel)
  }
  async getClients(trainerId: string): Promise<IUser[]> {
    return getClients(trainerId, this.userModel)
  }


}