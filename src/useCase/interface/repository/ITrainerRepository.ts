import { ITrainer } from "../../../domain/trainer";
import { RequesEmailData } from "../services/Iresponse";
import { IUser } from "../../../domain/user";
import { ISession } from "../../../domain/session";

export interface ITrainerRepository {
  createTrainer(newTrainer:ITrainer):Promise<string>;
  findTrainer(email:string):Promise<ITrainer | null>;
  reviewRequests(id:string,status:string):Promise<RequesEmailData>;
  blockTrainer(_id:string):Promise<string | null>;
  updateProfile(data:Record<string,string>): Promise<ITrainer>;
  addProfile(profile_img:string,_id:string):Promise<ITrainer|never>;
  getClients(trainerId: string): Promise<IUser[]>;
  addDescription(trainerId:string,description:string):Promise<ITrainer | null>;
  addExperience(trainerId:string,experience:string):Promise<ITrainer | null>;
  addSession(trainerId:string,session:ISession):Promise<ITrainer | null>;
  getSessions(trainerId:string): Promise<any>
  removeSessions(trainerId:string,sessionId:string):Promise<any>;
}