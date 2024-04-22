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

  
}
