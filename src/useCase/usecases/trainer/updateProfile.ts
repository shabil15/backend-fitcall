import ErrorResponse from "../../handler/errorResponse";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import {  ITrainerResponse } from "../../interface/services/Iresponse";


export const updateProfile = async (
  requestValidator: IRequestValidator,
  trainerRepository: ITrainerRepository,
  _id:string,
  name : string,
  mobile : string,
): Promise<ITrainerResponse> => {
  try {
    
    const validation = requestValidator.validateRequiredFields(
      {_id,name,mobile},
      ["_id","name","mobile"]
    );

    if (!validation.success) {
        console.log('validation');
        
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const data = {
        _id,
        name,
        mobile
    }
      const updatedTrainer = await trainerRepository.updateProfile(data);
      
      return {
        status: 200,
        success: true,
        message: `Successfully Uploaded Profile `,
        data : updatedTrainer
      };
    
  } catch (err) {
    throw err;
  }
};
