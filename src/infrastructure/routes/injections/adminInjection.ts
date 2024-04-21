import { AdminAdapter } from "../../../adapter/adminAdapter";
import { AdminUseCase } from "../../../useCase/usecases/adminUseCase";
import { AdminRepository } from "../../database/repository/adminRepository";
import AdminModel from "../../database/model/adminModel";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


const adminRepository = new AdminRepository(AdminModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();

const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  adminRepository,
  bcrypt,
  jwt,
  requestValidator
);

const adminAdapter = new AdminAdapter(adminusecase);

export {adminAdapter,adminusecase};