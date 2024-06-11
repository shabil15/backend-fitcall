import { IRequestValidator } from "../interface/repository/IValidRepository";
import { ITrainerRepository } from "../interface/repository/ITrainerRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import { createTrainer } from "./trainer/createTrainer";
import { loginTrainer } from "./trainer/loginTrainer";
import { updateProfile } from "./trainer/updateProfile";
import { addProfile } from "./trainer/addProfile";
import { IUser } from "../../domain/user";
import {addDescription} from './trainer/addDescription';
import { addExperience } from "./trainer/addExperience";
import { ISession } from "../../domain/session";
import { addSession } from "./trainer/addSession";

export class TrainerUseCase {
  private readonly trainerRepository: ITrainerRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    trainerRepository: ITrainerRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.trainerRepository = trainerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }

  async createTrainer({
    name,
    mobile,
    email,
    password,
    description,
    language,
    specialisation,
    certificate,
    profile_img,
  }: {
    name: string;
    mobile: string;
    email: string;
    password: string;
    description: string;
    language: string;
    specialisation: string;
    certificate: string;
    profile_img?: string;
  }) {
    return createTrainer(
      this.requestValidator,
      this.trainerRepository,
      this.bcrypt,
      name,
      mobile,
      email,
      password,
      description,
      language,
      specialisation,
      certificate,
      profile_img
    );
  }

  async loginTrainer({email,password}:{email:string;password:string}) {
    return loginTrainer(
      this.requestValidator,
      this.trainerRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    )
  }

  async updateProfile({
    _id,
    name,
    mobile
  }: {
  _id : string,
  name : string,
  mobile : string
  }) {
   return updateProfile(
     this.requestValidator,
     this.trainerRepository,
     _id,
     name,
     mobile
   );
  }


  async addProfile({
    profile_img,
    _id,
 }: {
 profile_img : string,
 _id : string
 }) {
   return addProfile(
     this.requestValidator,
     this.trainerRepository,
     profile_img,
     _id
   );
 }

 async getClients(trainerId: string): Promise<IUser[]> {
  return await this.trainerRepository.getClients(trainerId);
}

async addDescription(trainerId: string, description:string) {
  return addDescription(this.requestValidator,this.trainerRepository, trainerId, description)
}

async addExperience(trainerId: string, experience:string) {
  return addExperience(this.requestValidator,this.trainerRepository, trainerId, experience)
}

async addSession(trainerId:string,session:ISession) {
  return addSession(this.requestValidator,this.trainerRepository,trainerId,session);
}

async getSessions(trainerId: string): Promise<any> {
  return await this.trainerRepository.getSessions(trainerId);
}

}
