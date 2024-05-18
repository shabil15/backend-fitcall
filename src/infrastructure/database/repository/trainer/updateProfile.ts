import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";


// Correct the parameter type for _id
export const updateProfile = async (
    data : Record<string,string>,
    trainerModels: typeof TrainerModel
): Promise<ITrainer| never> => {
    try {
       
        const trainer = await trainerModels.findOne({ _id: data._id}).select("-password");
        if (trainer) {
            // Assuming isStatus is a property on the user model
            trainer.name = data.name
            trainer.mobile = data.mobile
            await trainer.save();
            return trainer;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
