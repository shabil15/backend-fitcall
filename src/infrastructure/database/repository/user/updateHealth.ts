import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const updateHealth = async (
    data:Record<string,string>,
    userModels:typeof UserModel
): Promise<IUser | never> => {
    try {
        console.log("health update");
        const user = await userModels.findOne({_id: data._id}).select("-password")
        if(user) {
            user.age = data.age
            user.weight = data.weight
            user.height = data.height
            user.goal = data.goal
            await user.save()
            return user;
        }
        throw new Error('Internal Server Error')
    } catch (error) {
        throw error;
    }
}