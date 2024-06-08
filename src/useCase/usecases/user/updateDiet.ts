import ErrorResponse from "../../handler/errorResponse"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { IUserResponse } from "../../interface/services/Iresponse"
import { IDiet } from "../../../domain/diet"


export const updateDiet = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    userId:string,
    diet:IDiet,
  ): Promise<IUserResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            {userId,diet},
            ["userId", "diet"]
        );

        if(!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }

       
        const updatedUser = await userRepository.updateDiet(userId,diet);

        return {
            status: 200,
            success: true,
            message: `User Diet Updated successfully`,
        }
            
    } catch (error) {
        throw error;
    }
}