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
import { addDescription } from "./trainer/addDescription";
import { addExperience } from "./trainer/addExperience";
import { ISession } from "../../../domain/session";
import { addSession } from "./trainer/addSession";
import { getSessions } from "./trainer/getSessions";
import { removeSessions } from "./trainer/removeSessions";

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

  async addDescription(userId: string, description: string): Promise<ITrainer | null> {
    return addDescription(userId,description,this.trainerModel);
  }

  async addExperience(trainerId: string, experience: string): Promise<ITrainer | null> {
    return addExperience(trainerId,experience,this.trainerModel);
  }

  async addSession(trainerId: string, session: ISession): Promise<ITrainer | null> {
    return addSession(trainerId,session,this.trainerModel);
  }

  async getSessions(trainerId:string): Promise<any>{
    return getSessions(trainerId,this.userModel,this.trainerModel);
  }

   async removeSessions(trainerId: string, sessionId: string): Promise<any> {
    return removeSessions(trainerId,sessionId);
  }
}