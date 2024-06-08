import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";

export const addExperience = async(
    trainerId:string,
    experience:string,
    trainerModels:typeof TrainerModel
):Promise <ITrainer | null> => {
try {
    console.log("Experience update");
     await trainerModels.updateOne(
        { _id: trainerId },
        { $set: { experience: experience }}
      ).exec();

      const user = await trainerModels.findOne({_id:trainerId}).select("-password");

      return user;
    
} catch (error) {
    throw error;
}
}