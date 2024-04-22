import TrainerModel from "../../model/trainerModel";

export const findTrainer = async (
  email:string,
  trainerModels:typeof TrainerModel
)=> {
  try {
    console.log("email finduser");
    const existingTrainer = await trainerModels.findOne({email})
    return existingTrainer
  } catch (error) {
    throw error
  }
}