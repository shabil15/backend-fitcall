import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";
import { IDiet } from "../../../../domain/diet";

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

      return user;
    
} catch (error) {
    throw error;
}
}