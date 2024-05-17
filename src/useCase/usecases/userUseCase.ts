import { IUser } from "../../domain/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import INodemailer from "../interface/services/Inodemailer";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";
import { verifyEmail } from "./user/sendEmail";
import { emailVerification } from "./user/emailVerification";
import { googleAuth } from "./user/googleAuth";
import { forgotPassword } from "./user/forgotPassword";
import { sendOtpFogotPassword } from "./user/sendOtpForgotPassword";
import { getTrainers } from "./user/getTrainers";
import { getTrainerDetails } from "./user/getTrainerData";
import { addProfile } from "./user/addProfile";
import { updateProfile } from "./user/updateProfile";


export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
  }

  async createUser({
    name,
    mobile,
    email,
    password,
  }: {
    name: string;
    mobile: string;
    email: string;
    password: string;
  }) {
    return createUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      name,
      mobile,
      email,
      password
    );
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  async verifyemail({email,name}:{email:string;name:string}) {
    return verifyEmail(this.requestValidator,this.nodemailer,email,name);
  }

  async emailVerification({otp,email}:{otp:string,email:string} ) {
    return emailVerification(this.requestValidator,this.nodemailer,otp,email);
  }

  async sendOtpFogotPassword({ email, name }: { email: string; name: string }) {
    return sendOtpFogotPassword(this.requestValidator,this.userRepository, this.nodemailer, email, name);
  }
  
  async forgotPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return forgotPassword(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  async googleAuth({
    name,
    email,
    password,
  }: {
    name:string;
    email:string;
    password:string;
  }) {
    return googleAuth(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      email,
      password
    )
  }

  async findAcceptedTrainers(page: number, perPage: number, specialisation: string, language: string, search: string){
    return getTrainers(page, perPage, specialisation, language, search);
  }

  async getTrainerDetails(trainerId: string){
    return getTrainerDetails(trainerId);
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
     this.userRepository,
     profile_img,
     _id
   );
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
   this.userRepository,
   _id,
   name,
   mobile
 );
}
 
}
