import ErrorResponse from "../../handler/errorResponse"
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { ITrainerResponse } from "../../interface/services/Iresponse"
import { ISession } from "../../../domain/session"


export const addSession = async (
    requestValidator: IRequestValidator,
    trainerRepository: ITrainerRepository,
    trainerId: string,
    session:ISession,
): Promise<ITrainerResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            { trainerId, session },
            ["trainerId", "session",]
        );

        if (!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }


        const updatedTrainer = await trainerRepository.addSession(trainerId, session);

        return {
            status: 200,
            success: true,
            message: `Trainer Session Updated successfully`,
            data: updatedTrainer,
        }

    } catch (error) {
        throw error;
    }
}