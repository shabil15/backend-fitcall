import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const block_unBlockTrainer = async(
  requestValidator: IRequestValidator,
  trainerRepository: ITrainerRepository,
  _id:string
):Promise<IResponse> => {
    try {
    const validation = requestValidator.validateRequiredFields(
      {_id},
      ["_id"]
    );
    if(!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }      

    const block = await trainerRepository.blockTrainer(_id);
    return {
      status:200,
      success:true,
      message:'Successfully Updated',
    }
    } catch (error) {
      throw error
    }
}