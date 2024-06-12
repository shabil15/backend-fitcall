import UserModel from "../../model/userModel";
import TrainerModel from "../../model/trainerModel";
import { ITrainer } from "../../../../domain/trainer";
import { IUser } from "../../../../domain/user";
import mongoose from "mongoose";

export const getSessions = async (trainerId: string, userModels: typeof UserModel,trainerModels:typeof TrainerModel) => {
    try {
        // const clients =  await userModels.find({ trainerId:trainerId })
        const trainer = await trainerModels.findById(trainerId);
        if (!trainer) throw new Error('Trainer not found');
    
        const sessions = await TrainerModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(trainerId) } },
            { $unwind: '$sessions' },
            {
              $lookup: {
                from: 'users',
                localField: 'sessions.userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            { $unwind: '$userDetails' },
            {
              $project: {
                startTime: '$sessions.startTime',
                clientName: '$userDetails.name',
                userId: '$userDetails._id',
                clientPlan:'$userDetails.goal'
              },
            },
          ]);
      console.log()
    return sessions;
    } catch (error) {
        throw error
    }
}