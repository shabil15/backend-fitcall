import TrainerModel from "../../model/trainerModel";

export const blockTrainer = async (
  _id:string,
  trainerModels: typeof TrainerModel
):Promise<string | null > => {
  try {
    const trainer = await trainerModels.findOne({_id:_id}).select("-password");
    if(trainer) {
      trainer.isBlocked = !trainer.isBlocked;
      await trainer.save();
      return "Successfully updated";
    }else {
      return null;
    }    
  } catch (error) {
    throw error
  }
}