import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";

export const addDescription = async(
    trainerId:string,
    description:string,
    trainerModels:typeof TrainerModel
):Promise <ITrainer | null> => {
try {
    console.log("Description update");
     await trainerModels.updateOne(
        { _id: trainerId },
        { $set: { description: description } }
      ).exec();

      const user = await trainerModels.findOne({_id:trainerId}).select("-password");

      return user;
    
} catch (error) {
    throw error;
}
}