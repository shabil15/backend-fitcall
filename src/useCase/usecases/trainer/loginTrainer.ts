import { ITrainer } from "../../../domain/trainer";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import Ijwt from "../../interface/services/IJwt";
import { IResponse,trainerResponseData } from "../../interface/services/Iresponse";

export const loginTrainer = async(
  requestValidator:IRequestValidator,
  trainerRepository:ITrainerRepository,
  bcrypt:IHashpassword,
  jwt:Ijwt,
  email:string,
  password:string
): Promise <IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      {email,password},
      ["email","password"]
    );

    if(!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }
    const trainer: ITrainer | null = await trainerRepository.findTrainer(email)

    if(trainer && trainer._id) {
      if(trainer.isBlocked) {
        throw ErrorResponse.badRequest("Your account is blocked")
      }

      if(trainer.status === "pending"){
        throw ErrorResponse.badRequest(
          "Your login will be activated as soon as your request is approved"
        );
      }

      if(trainer.status ==='rejected'){
        throw ErrorResponse.badRequest(
          "Unfortunately, your request has been rejected"
        )
      }

      const match :boolean = await bcrypt.compare(password,trainer.password);
      if(match){
        const token = jwt.createJWT(trainer._id, trainer.email, "trainer", trainer.name);
        const responseData : trainerResponseData = {
          _id:trainer._id,
          name:trainer.name,
          mobile:trainer.mobile,
          email:trainer.email,
          profile_img:trainer.profile_img,
          language:trainer.language,
          specialisation:trainer.specialisation,
          description: trainer.description,
          joinDate:trainer.createdAt
        };
        return {
          status:200,
          success:true,
          token:token,
          data:responseData,
          message:`Login SuccessFull . Welcome ${trainer.name}`,
        }
      }
      throw ErrorResponse.badRequest("Wrong password or email")
    }
    throw ErrorResponse.notFound("Wrong password or email");
  } catch (error) {
    throw error
  }
}