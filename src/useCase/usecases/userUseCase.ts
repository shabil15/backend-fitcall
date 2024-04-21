import { IUser } from "../../domain/user";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import IHashpassword from "../interface/services/IHashpassword";
import Ijwt from "../interface/services/IJwt";
import { createUser } from "./user/createUser";

export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;

  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    (this.bcrypt = bcrypt), (this.jwt = jwt);
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
}
