import TrainerModel from "../../../infrastructure/database/model/trainerModel";
import { ITrainerResponse } from "../../interface/services/Iresponse";

export const getTrainers  = async (): Promise <ITrainerResponse> => {
  try {
    const trainers = await TrainerModel.find({status:"accepted",isBlocked:false}).select("-password");
    return {
      status:200,
      success:true,
      data:trainers,
    }
  } catch (error) {
    throw new Error (`Error fetching trainers:${error}`)
  }
}