import { IUser } from "../../../domain/user";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import Ijwt from "../../interface/services/IJwt";
import { IResponse } from "../../interface/services/Iresponse";

export const loginUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
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

    const user: IUser | null = await userRepository.findUser(email);

    if (user && user._id) {
      if (user.isBlocked) {
        throw ErrorResponse.badRequest("User is blocked");
      }
      const match: boolean = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.createJWT(user._id, user.email, "user", user.name);
        return {
          status: 200,
          success: true,
          data: token,
          message: "Successfully logged In",
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }
    throw ErrorResponse.notFound("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
