import { ITrainer } from "../../../domain/trainer";
import { RequesEmailData } from "../services/Iresponse";

export interface ITrainerRepository {
  createTrainer(newTrainer:ITrainer):Promise<string>;
  findTrainer(email:string):Promise<ITrainer | null>;
}