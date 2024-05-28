import UserModel from "../../../infrastructure/database/model/userModel";
import { IResponse } from "../../interface/services/Iresponse";
import { findUser } from "../../../infrastructure/database/repository/user/findUser";

export const getUser = async (email: string):Promise<IResponse> =>{
  try{
    const user = await findUser(email,UserModel);
    if (user === null) {
      throw new Error("Trainer not found");
    }
    return {
      status:200,
      success:true,
      data:user,
    };
  } catch (error) {
    throw new Error(`Error fetching trainer: ${error}`);
  }
}