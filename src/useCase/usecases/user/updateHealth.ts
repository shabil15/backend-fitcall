import ErrorResponse from "../../handler/errorResponse"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { IUserResponse } from "../../interface/services/Iresponse"

export const updateHealth = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    _id:string,
    age:string,
    weight:string,
    height:string,
    goal:string
  ): Promise<IUserResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            {_id,age,weight,height,goal},
            ["_id","age","weight","height","goal"]
        );

        if(!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const data = {
            _id,
            age,
            weight,
            height,
            goal
        }
        const updatedUser = await userRepository.updateHealth(data);

        return {
            status: 200,
            success: true,
            message: `Successfully Uploaded Health Data`,
            data: updatedUser
        }
            
    } catch (error) {
        throw error;
    }
}