import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const addTestRes = async (
    _id: string,
    testResult:string,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
       
        const user = await userModels.findOne({ _id: _id }).select("-password");
        if (user) {
             
            user.testResult = testResult;
            await user.save();
            return user;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
