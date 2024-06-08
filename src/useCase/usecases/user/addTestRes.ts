import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import {  IUserResponse } from "../../interface/services/Iresponse";


export const addTestRes = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  testResult:string,
  _id:string
): Promise<IUserResponse> => {
  try {
    
    const validation = requestValidator.validateRequiredFields(
      {testResult,_id },
      [ "testResult", "_id"]
    );

    if (!validation.success) {
        console.log('validation');
        
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const updatedUser = await userRepository.addTestRes(testResult,_id);
      
      return {
        status: 200,
        success: true,
        message: `Successfully Uploaded Profile Image`,
        data : updatedUser
      };
    
  } catch (err) {
    throw err;
  }
};
