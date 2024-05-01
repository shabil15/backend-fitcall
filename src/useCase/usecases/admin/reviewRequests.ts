import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";



export const reviewRequests = async (
  requestValidator:IRequestValidator,
  trainerRepository: ITrainerRepository,
  nodemailer:INodemailer,
  id:string,
  status: string
): Promise <IResponse>  => {
  try {
    const validation = requestValidator.validateRequiredFields(
      {id,status},
      ["id","status"]
    );
    if(!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const trainer = await trainerRepository.reviewRequests(id,status)
    console.log(trainer);
    await nodemailer.sendMessageToEmail(trainer.email,trainer.name,status);
    return {
      status:200,
      success:true,
      message:"Trainer Request successfully Updated",
    }
  } catch (error) {
    throw error
  }
}