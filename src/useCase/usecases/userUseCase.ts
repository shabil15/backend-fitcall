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
import { createPayment } from "./user/createPayment";
import { finalConfirmation } from "./user/finalConfirmation";
import IStripe from "../interface/services/IStripe";
import { updateHealth } from "./user/updateHealth";
import { getUser } from "./user/findUser";
import { setTrainer } from "./user/setTrainer";
import { getSubscription } from "./user/getSubscriptions";
import { updateDiet } from "./user/updateDiet";
import { IDiet } from "../../domain/diet";
import { addTestRes } from "./user/addTestRes";
import { StripeService1 } from "../../infrastructure/services/stripeRefund";

export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly stripe: IStripe;
  private stripeService: StripeService1
  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    stripe: IStripe,
    stripeService:StripeService1

  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.stripe = stripe;
    this.stripeService = stripeService;
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

  async verifyemail({ email, name }: { email: string; name: string }) {
    return verifyEmail(this.requestValidator, this.nodemailer, email, name);
  }

  async emailVerification({ otp, email }: { otp: string, email: string }) {
    return emailVerification(this.requestValidator, this.nodemailer, otp, email);
  }

  async sendOtpFogotPassword({ email, name }: { email: string; name: string }) {
    return sendOtpFogotPassword(this.requestValidator, this.userRepository, this.nodemailer, email, name);
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
    name: string;
    email: string;
    password: string;
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

  async findAcceptedTrainers(page: number, perPage: number, specialisation: string, language: string, search: string) {
    return getTrainers(page, perPage, specialisation, language, search);
  }

  async getTrainerDetails(trainerId: string) {
    return getTrainerDetails(trainerId);
  }

  async getUser(email: string) {
    return getUser(email);
  }


  async addProfile({
    profile_img,
    _id,
  }: {
    profile_img: string,
    _id: string
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
    _id: string,
    name: string,
    mobile: string
  }) {
    return updateProfile(
      this.requestValidator,
      this.userRepository,
      _id,
      name,
      mobile
    );
  }

  async createPayment({ amount, email, userId }: { amount: number, email: string, userId: string }) {
    return createPayment(this.stripe, amount, email, userId)
  }

  async finalConfirmation({ email, amount, transactionId, userId }: { email: string, amount: number, transactionId: string, userId: string }) {
    return finalConfirmation(this.userRepository, email, amount, transactionId, userId)
  }


  async updateHealth({
    _id,
    age,
    weight,
    height,
    goal
  }: {
    _id: string, age: string, weight: string, height: string, goal: string
  }) {
    return updateHealth(
      this.requestValidator,
      this.userRepository,
      _id,
      age,
      weight,
      height,
      goal
    )
  }

  async setTrainer({
    userId, trainerId
  }: {
    userId: string, trainerId: string
  }) {
    return setTrainer(
      this.requestValidator,
      this.userRepository,
      userId,
      trainerId,
    )
  }

  async getSubscription(userId: string) {
    return getSubscription(userId)
  }

  async updateDiet(userId: string, diet: IDiet) {
    return updateDiet(this.requestValidator,
      this.userRepository, userId, diet)
  }

  async addTestRes({
    testResult,
    _id,
  }: {
    testResult: string,
    _id: string
  }) {
    return addTestRes(
      this.requestValidator,
      this.userRepository,
      testResult,
      _id
    );
  }

  async createRefund(userId: string): Promise<IUser | never> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) throw new Error('User not found');

      const activeSubscription = user?.subscriptions?.find(sub => sub.isActive);
      if (!activeSubscription) throw new Error('No active subscription found');

      const now = new Date();
      const start = new Date(activeSubscription.start);
      const diff = (now.getTime() - start.getTime()) / (1000 * 3600 * 24);

      if (diff > 3) throw new Error('Refund period has expired');

      await this.stripeService.createRefund(activeSubscription.paymentId, activeSubscription.amount);
      
      activeSubscription.isActive = false;
      activeSubscription.cancelledAt = now;

      const newUser = await this.userRepository.createRefund(userId);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  
}
