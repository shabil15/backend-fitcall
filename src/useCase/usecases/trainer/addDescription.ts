import ErrorResponse from "../../handler/errorResponse"
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { ITrainerResponse } from "../../interface/services/Iresponse"


export const addDescription = async (
    requestValidator: IRequestValidator,
    trainerRepository: ITrainerRepository,
    trainerId:string,
    description:string,
  ): Promise<ITrainerResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            {trainerId,description},
            ["trainerId","description"]
        );

        if(!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }

       
        const updatedTrainer = await trainerRepository.addDescription(trainerId,description);

        return {
            status: 200,
            success: true,
            message: `Trainer Description Updated successfully`,
            data:updatedTrainer,
        }
            
    } catch (error) {
        throw error;
    }
}