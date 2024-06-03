import Nodemailer from "../../services/nodemailer";
import { AdminAdapter } from "../../../adapter/adminAdapter";
import { AdminUseCase } from "../../../useCase/usecases/adminUseCase";
import { AdminRepository } from "../../database/repository/adminRepository";
import { UserRepository } from "../../database/repository/userRepository";
import AdminModel from "../../database/model/adminModel";
import UserModel from "../../database/model/userModel";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";
import { TrainerRepository } from "../../database/repository/trainerRepository";
import TrainerModel from "../../database/model/trainerModel";

const userRepository = new UserRepository(UserModel);
const adminRepository = new AdminRepository(AdminModel);
const trainerRepository = new TrainerRepository(TrainerModel,UserModel)
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();

const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  adminRepository,
  userRepository,
  trainerRepository,
  bcrypt,
  jwt,
  requestValidator,
  nodemailer,
);

const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter, adminusecase };
