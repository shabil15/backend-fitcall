import TrainerModel from "../../../infrastructure/database/model/trainerModel";
import { ITrainerResponse } from "../../interface/services/Iresponse";

export const getJoinRequests = async (): Promise <ITrainerResponse> => {
  try {
    const users = await TrainerModel.find({}).select("-password");
    return {
      status:200,
      success:true,
      data:users,
    }
  } catch (error) {
    throw new Error (`Error fetching users:${error}`)
  }
}