import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const createUser = async (
  newUser: IUser,
  userModels: typeof UserModel
): Promise<IUser> => {
  try {
    const user = await userModels.create(newUser);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
