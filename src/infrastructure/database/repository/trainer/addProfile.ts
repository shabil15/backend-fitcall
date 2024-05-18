import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";

export const addProfile = async (
    _id: string,
    profile_img:string,
    trainerModels: typeof TrainerModel
): Promise<ITrainer | never> => {
    try {
       
        const trainer = await trainerModels.findOne({ _id: _id }).select("-password");
        if (trainer) {
             
            trainer.profile_img = profile_img;
            await trainer.save();
            return trainer;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
