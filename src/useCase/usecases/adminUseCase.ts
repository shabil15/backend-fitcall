import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import { loginAdmin } from "./admin/loginAdmin";
import { getUsers } from "./admin/getUser";
import { blockUnblockUser } from "./admin/blockUser";

export class AdminUseCase {
  private readonly adminRepository :IAdminRepository;
  private readonly userRepository: IUserRepository;
  private readonly bcrypt:IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator :IRequestValidator;

  constructor(
    adminRepository: IAdminRepository,
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt :Ijwt,
    requestValidator: IRequestValidator
  ){
    this.adminRepository = adminRepository
    this.userRepository = userRepository;
    this.bcrypt= bcrypt;
    this.jwt = jwt;
    this.requestValidator= requestValidator;
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


}