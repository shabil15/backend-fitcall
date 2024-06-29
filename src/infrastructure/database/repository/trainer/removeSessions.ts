import UserModel from "../../model/userModel";
import TrainerModel from "../../model/trainerModel";
import { ITrainer } from "../../../../domain/trainer";
import { IUser } from "../../../../domain/user";
import mongoose from "mongoose";

export const removeSessions = async (trainerId: string,sessionId:string) => {
    try {
        const trainer = await TrainerModel.findById(trainerId);
        if (!trainer) throw new Error('Trainer not found');
        
        const session = trainer.sessions?.find((s) => s?._id?.toString() === sessionId);
  if (!session) {
    throw new Error("Session not found");
  }

  await TrainerModel.updateOne(
    { _id: trainerId },
    { $pull: { sessions: { _id: sessionId } } }
  ).exec();

  await UserModel.updateOne(
    { _id: session?.userId },
    { $unset: { sessionTime: "" } }
  ).exec();

       
    } catch (error) {
        throw error
    }
}