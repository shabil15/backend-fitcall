import ErrorResponse from "../../handler/errorResponse";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import {  ITrainerResponse } from "../../interface/services/Iresponse";


export const addProfile = async (
  requestValidator: IRequestValidator,
  trainerRepository: ITrainerRepository,
  profile_img:string,
  _id:string
): Promise<ITrainerResponse> => {
  try {
    
    const validation = requestValidator.validateRequiredFields(
      {profile_img,_id },
      [ "profile_img", "_id"]
    );

    if (!validation.success) {
        console.log('validation');
        
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const updatedTrainer = await trainerRepository.addProfile(profile_img,_id);
      
      return {
        status: 200,
        success: true,
        message: `Successfully Uploaded Profile Image`,
        data : updatedTrainer
      };
    
  } catch (err) {
    throw err;
  }
};
