import RequestValidator from "../../../infrastructure/services/validateRepository";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const blockUnblockUser = async (
  requestValidator:IRequestValidator,
  userRepository:IUserRepository,
  _id:string,
):Promise<IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
    {_id},
    ["_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const block = await userRepository.blockUser(_id)
    return {
      status: 200,
      success: true,
      message: `Successfully updated`,
    };
  } catch (error) {
    throw error
  }
}