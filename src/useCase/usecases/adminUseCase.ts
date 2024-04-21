import { IAdminRepository } from "../interface/repository/IAdminRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import { loginAdmin } from "./admin/loginAdmin";

export class AdminUseCase {
  private readonly userRepository: IAdminRepository;
  private readonly bcrypt:IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator :IRequestValidator;

  constructor(
    userRepository: IAdminRepository,
    bcrypt: IHashpassword,
    jwt :Ijwt,
    requestValidator: IRequestValidator
  ){
    this.userRepository = userRepository;
    this.bcrypt= bcrypt;
    this.jwt = jwt;
    this.requestValidator= requestValidator;
  }

  async loginAdmin({ email, password }: { email: string; password: string }){
    return loginAdmin(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    )
  }
}