import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";

export const emailVerification = async (
  requestValidator: IRequestValidator,
  nodemailer: INodemailer,
  otp: string,
  email: string
): Promise<IResponse> => {
  try {
    console.log(email);
    console.log(otp);

    const validation = requestValidator.validateRequiredFields({ email, otp }, [
      "email",
      "otp",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.verifyEmail(otp, email);
    if (verify) {
      return {
        status: 200,
        success: true,
        message: "Succesfully logged In",
      };
    }
    throw ErrorResponse.badRequest("Wrong OTP");
  } catch (error) {
    throw error;
  }
};
