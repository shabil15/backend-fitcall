import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";
import { ISession } from "../../../../domain/session";

export const addSession = async(
    trainerId:string,
    session:ISession,
    trainerModels:typeof TrainerModel
):Promise <ITrainer | null> => {
try {
    console.log("Session update");
    const trainer = await trainerModels.findById(trainerId);

    if(!trainer) throw new Error("Trainer not found");

    trainer?.sessions?.push(session);
    await trainer.save();
    return trainer;
    
} catch (error) {
    throw error;
}
}