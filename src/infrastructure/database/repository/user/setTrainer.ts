import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const setTrainer = async (
    data:Record<string,string>,
    userModels:typeof UserModel
): Promise<IUser | never> => {
    try {
        console.log("set Trainer repositories");
        const user = await userModels.findOne({_id: data.userId}).select("-password")
        if(user) {
            if(user.isSubscribed){
            user.trainerId = data.trainerId;
            await user.save()
            return user;
        }else {
            throw new Error("User not subscribed");
        }
    }
        throw new Error('Internal Server Error')
    } catch (error) {
        throw error;
    }
}