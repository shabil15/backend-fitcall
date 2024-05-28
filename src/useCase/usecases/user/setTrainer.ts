import ErrorResponse from "../../handler/errorResponse"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { IUserResponse } from "../../interface/services/Iresponse"

export const setTrainer = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    userId:string,
    trainerId:string
  ): Promise<IUserResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            {userId, trainerId},
            ["userId", "trainerId"]
        );

        if(!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const data = {
            userId,
            trainerId
        }
        const updatedUser = await userRepository.setTrainer(data);

        return {
            status: 200,
            success: true,
            message: `Trainer booked successfully`,
            data: updatedUser
        }
            
    } catch (error) {
        throw error;
    }
}