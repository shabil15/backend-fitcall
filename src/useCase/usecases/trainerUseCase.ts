import { IRequestValidator } from "../interface/repository/IValidRepository";
import { ITrainerRepository } from "../interface/repository/ITrainerRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import { createTrainer } from "./trainer/createTrainer";
import { loginTrainer } from "./trainer/loginTrainer";

export class TrainerUseCase {
  private readonly trainerRepository: ITrainerRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    traierRepository: ITrainerRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.trainerRepository = traierRepository;
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
}
