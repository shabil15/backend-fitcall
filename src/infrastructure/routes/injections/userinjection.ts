import { UserAdapter } from "../../../adapter/userAdapter";
import { UserUseCase } from "../../../useCase/usecases/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer"
import RequestValidator from "../../services/validateRepository";
import StripeService from "../../services/stripe";
import { StripeService1 } from "../../services/stripeRefund";


const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const stripe = new StripeService();
const stripeRefund = new StripeService1();

const requestValidator = new RequestValidator();

const userusecase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  stripe,
  stripeRefund
);
const userAdapter = new UserAdapter(userusecase);

export {userAdapter,userRepository};