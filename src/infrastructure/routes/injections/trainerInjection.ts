import { TrainerAdapter } from "../../../adapter/trainerAdapter";
import { TrainerUseCase } from "../../../useCase/usecases/trainerUseCase";
import TrainerModel from "../../database/model/trainerModel";
import { TrainerRepository } from "../../database/repository/trainerRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";

const traierRepository = new TrainerRepository(TrainerModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const trainerusecase = new TrainerUseCase(
  traierRepository,
  bcrypt,
  jwt,
  requestValidator
);

const trainerAdapter = new TrainerAdapter(trainerusecase);

export { trainerAdapter };
