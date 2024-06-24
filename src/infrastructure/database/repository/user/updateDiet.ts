import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";
import { IDiet } from "../../../../domain/diet";
import { createNotification } from "../../../services/notification";

export const updateDiet = async(
    userId:string,
    diet:IDiet,
    userModels:typeof UserModel
):Promise <IUser | null> => {
try {
    console.log("Diet update");
     await userModels.updateOne(
        { _id: userId },
        { $set: { diet: diet } }
      ).exec();

      const user = await userModels.findOne({_id:userId}).select("-password");
      createNotification("Diet update", "Your Trainer updated your diet",user?._id);
      return user;
    
} catch (error) {
    throw error;
}
}