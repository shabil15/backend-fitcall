import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";
import TrainerModel from "../../model/trainerModel";
import { ITrainer } from "../../../../domain/trainer";

export const setTrainer = async (
    data:Record<string,string>,
    userModels:typeof UserModel,
): Promise<IUser | never> => {
    try {
        console.log("set Trainer repositories");
        const user = await userModels.findOne({_id: data.userId}).select("-password")
        const trainer  = await TrainerModel.findOne({_id:data.trainerId}).select("-password")
        
        if(trainer){
            trainer.clientCount = trainer.clientCount?trainer.clientCount + 1 : 1 ;
            await trainer.save();
        }
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