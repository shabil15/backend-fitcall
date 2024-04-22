import { IAdmin } from "../../../domain/admin";
import ErrorResponse from "../../handler/errorResponse";
import { IAdminRepository } from "../../interface/repository/IAdminRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import Ijwt from "../../interface/services/IJwt";
import { IResponse, } from "../../interface/services/Iresponse";

export const loginAdmin = async (
  requestValidator: IRequestValidator,
  adminRepository: IAdminRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const admin: IAdmin | null = await adminRepository.findAdmin(email);

    if (admin && admin._id) {
      const match: boolean = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.createJWT(
          admin._id,
          admin.email,
          "admin",
          admin.name
        );
        return {
          status: 200,
          success: true,
          message: "Successfully logged In",
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }
    throw ErrorResponse.notFound("Wrong password or email");
  } catch (error) {
    throw error;
  }
};
