import { RequesEmailData } from "../../../../useCase/interface/services/Iresponse";
import TrainerModel from "../../model/trainerModel";

export const reviewRequests = async (
  id: string,
  status: string,
  trainerModels: typeof TrainerModel
): Promise<RequesEmailData | never> => {
  try {
    const trainer = await trainerModels
      .findOne({ _id: id })
      .select("-password");
    if (trainer) {
      trainer.status = status;
      await trainer.save();
      const data = {
        email: trainer.email,
        name: trainer.name,
      };
      return data;
    }
    throw new Error("Worker not found");
  } catch (error) {
    throw error;
  }
};
