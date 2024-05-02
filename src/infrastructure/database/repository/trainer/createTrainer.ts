import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";

export const createTrainer = async (
  newTrainer: ITrainer,
  trainerModel: typeof TrainerModel
): Promise <string> => {
  try {
    const trainer = await trainerModel.create(newTrainer);
    await trainer.save()
    return "Your Join Request has been Sent successfully,Please wait for further updates";
  } catch (error) {
    throw error
  }
}