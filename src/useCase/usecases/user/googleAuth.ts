import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import Ijwt from "../../interface/services/IJwt";
import { IResponse, StoreData } from "../../interface/services/Iresponse";


export const googleAuth = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt : Ijwt,
  name: string,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { name, email, password },
      [ "name", "email", "password"]
    );

    console.log("google Auth controller")
    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email); // checking if the user exist or not

    if (!user) {
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
      const createnewUser = await userRepository.createUser(newUser);
      const token = jwt.createJWT(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);

      return {
        status: 200,
        success: true,
        message: `Successfully Registerd Welcome ${createnewUser.name}`,
        token : token,
        data : createnewUser,
      };
    }
   
    if (user && user._id) {
        if (user.isBlocked) {
          throw ErrorResponse.badRequest("You account is blocked");
        }
          const token = jwt.createJWT(user._id, user.email, "user", user.name);
  
          const responseData: StoreData = {
            _id: user._id,
            name: user.name,
            email : user.email
          };
  
          return {
            status: 200,
            success: true,
            token: token,
            data:user,
            message: `Login successful. Welcome ${user.name}`,
          };
        }  
        throw ErrorResponse.internalError("Unexpected error occurred");   
  } catch (err) {
    throw err;
  }

}
