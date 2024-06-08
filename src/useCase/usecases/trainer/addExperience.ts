import ErrorResponse from "../../handler/errorResponse"
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { ITrainerResponse } from "../../interface/services/Iresponse"


export const addExperience = async (
    requestValidator: IRequestValidator,
    trainerRepository: ITrainerRepository,
    trainerId: string,
    experience: string,
): Promise<ITrainerResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            { trainerId, experience },
            ["trainerId", "experience"]
        );

        if (!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }


        const updatedTrainer = await trainerRepository.addExperience(trainerId, experience);

        return {
            status: 200,
            success: true,
            message: `Trainer Experience Updated successfully`,
            data: updatedTrainer,
        }

    } catch (error) {
        throw error;
    }
}