import TrainerModel from "../../../infrastructure/database/model/trainerModel";
import { ITrainerResponse } from "../../interface/services/Iresponse";
import { getTrainerData } from "../../../infrastructure/database/repository/user/getTrainerData";

export const getTrainerDetails = async (trainerId: string):Promise<ITrainerResponse> =>{
  try{
    const trainer = await getTrainerData(trainerId);
    if (trainer === null) {
      throw new Error("Trainer not found");
    }
    return {
      status:200,
      success:true,
      data:trainer,
    };
  } catch (error) {
    throw new Error(`Error fetching trainer: ${error}`);
  }
}