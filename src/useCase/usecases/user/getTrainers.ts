import TrainerModel from "../../../infrastructure/database/model/trainerModel";
import { ITrainerResponse } from "../../interface/services/Iresponse";

export const getTrainers  = async (page: number, perPage: number, specialisation: string, language: string, search: string): Promise <ITrainerResponse> => {
  try {
    let query: any = { status: "accepted", isBlocked: false };
    // Apply filtering by specialisation
    if (specialisation) {
      query['specialisation'] = specialisation;
    }

    // Apply filtering by language
    if (language) {
      query['language'] = language;
    }

    // Apply search
    if (search) {
      query['name'] = { $regex: new RegExp(search, 'i') };
    }

    const totalTrainersCount = await TrainerModel.countDocuments(query);

    const trainers = await TrainerModel.find(query)
        .select("-password")
        .limit(perPage)
        .skip((page - 1) * perPage);

    return {
      status:200,
      success:true,
      data:trainers,
      total:totalTrainersCount
    }
  } catch (error) {
    throw new Error (`Error fetching trainers:${error}`)
  }
}