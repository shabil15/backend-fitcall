import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";
import { IRating } from "../../../../domain/rating";

export const addRating = async(
    trainerId:string,
    rating:IRating,
    trainerModels:typeof TrainerModel
):Promise <ITrainer | null> => {
try {
    console.log("Rating update");
    const trainer = await trainerModels.findById(trainerId);

    if(!trainer) throw new Error("Trainer not found");

    trainer?.ratings?.push(rating);

    await trainer.save();
    return trainer;
    
} catch (error) {
    throw error;
}
}