import UserModel from "../../model/userModel";
import { IUser } from "../../../../domain/user";
export const findById = async (userId:string,userModels: typeof UserModel) :  Promise<IUser | null> =>{
    try {
        const user = await userModels.findById(userId).select("-password")
        return user;
    } catch (error) {
    throw new Error(`Error fetching user by ID:${error}`);
    }
}