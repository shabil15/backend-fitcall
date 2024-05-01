import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { ITrainerRepository } from "../interface/repository/ITrainerRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import INodemailer from "../interface/services/Inodemailer";
import { loginAdmin } from "./admin/loginAdmin";
import { getUsers } from "./admin/getUser";
import { blockUnblockUser } from "./admin/blockUser";
import { getJoinRequests } from "./admin/getJoinRequests";
import { reviewRequests } from "./admin/reviewRequests";

export class AdminUseCase {
  private readonly adminRepository :IAdminRepository;
  private readonly userRepository: IUserRepository;
  private readonly trainerRepository: ITrainerRepository;
  private readonly bcrypt:IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator :IRequestValidator;
  private readonly nodemailer :INodemailer;

  constructor(
    adminRepository: IAdminRepository,
    userRepository: IUserRepository,
    trainerRepository: ITrainerRepository,
    bcrypt: IHashpassword,
    jwt :Ijwt,
    requestValidator: IRequestValidator,
    nodemailer:INodemailer,
  ){
    this.adminRepository = adminRepository
    this.userRepository = userRepository;
    this.trainerRepository = trainerRepository;
    this.bcrypt= bcrypt;
    this.jwt = jwt;
    this.requestValidator= requestValidator;
    this.nodemailer=nodemailer;
  }

  async loginAdmin({ email, password }: { email: string; password: string }){
    return loginAdmin(
      this.requestValidator,
      this.adminRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    )
  }

  async findAllUser() {
    return getUsers()
  }

  async blockUnblockUser(_id:string){
    return blockUnblockUser(
      this.requestValidator,
      this.userRepository,
      _id
    )
  }

  async findAllRequests() {
    return getJoinRequests(
    );
  }

  async reviewRequests({id,status}:{id:string,status:string}) {
    return reviewRequests(
      this.requestValidator,
      this.trainerRepository,
      this.nodemailer,
      id,
      status
    )
  }

}