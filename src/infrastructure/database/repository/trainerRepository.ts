import { ITrainer } from "../../../domain/trainer";
import { ITrainerRepository } from "../../../useCase/interface/repository/ITrainerRepository";
import { RequesEmailData } from "../../../useCase/interface/services/Iresponse";
import TrainerModel from "../model/trainerModel";
import { createTrainer } from "./trainer/createTrainer";
import { findTrainer } from "./trainer/findTrainer";
import { reviewRequests } from "./trainer/reviewRequests";
import { blockTrainer } from "./trainer/blockTrainer";
import { updateProfile } from "./trainer/updateProfile";


export class TrainerRepository implements ITrainerRepository{
  constructor(private readonly trainerModel:typeof TrainerModel){}


   async createTrainer(newTrainer: ITrainer): Promise<string> {
    return createTrainer(newTrainer,this.trainerModel);    
  }

  async findTrainer(email: string): Promise<ITrainer | null> {
    return findTrainer(email, this.trainerModel);
  }
  
  async reviewRequests(id: string, status: string): Promise<RequesEmailData> {
      return reviewRequests(id,status,this.trainerModel)
  }

 async blockTrainer(_id: string): Promise<string | null> {
      return blockTrainer(_id,this.trainerModel);
  }

  async updateProfile(data: Record<string, string>): Promise<ITrainer| never>{
    return updateProfile(data,this.trainerModel)
  }
  
}