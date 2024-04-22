import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { IResponse } from "../../interface/services/Iresponse";

export const createTrainer = async (
  requestValidator: IRequestValidator,
  trainerRepository: ITrainerRepository,
  bcrypt: IHashpassword,
  name: string,
  mobile: string,
  email: string,
  password: string,
  description: string,
  language: string,
  specialisation: string,
  certificate: string,
  profile_img?: string
): Promise<IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      {
        name,
        mobile,
        email,
        password,
        description,
        language,
        specialisation,
        certificate,
        profile_img,
      },
      [
        "name",
        "mobile",
        "email",
        "password",
        "description",
        "language",
        "specialisation",
        "certificate",
        "profile_img",
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const trainer = await trainerRepository.findTrainer(email);
    if (!trainer) {
      const hashedPassword = await bcrypt.createHash(password);

      const newTrainer = {
        name,
        mobile,
        email,
        password: hashedPassword,
        description,
        language,
        specialisation,
        certificate,
        profile_img,
      };
      const createNewTrainer = await trainerRepository.createTrainer(
        newTrainer
      );
      return {
        status: 200,
        success: true,
        message: createNewTrainer,
      };
    }
    throw ErrorResponse.badRequest("Trainer Already exist");
  } catch (error) {
    throw error;
  }
};
