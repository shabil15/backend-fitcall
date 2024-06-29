import { ITrainer } from "../../../../domain/trainer";
import TrainerModel from "../../model/trainerModel";
import { ISession } from "../../../../domain/session";
import UserModel from "../../model/userModel";

export const addSession = async (
    trainerId: string,
    session: ISession,
    trainerModels: typeof TrainerModel,
): Promise<ITrainer | null> => {
    try {
        console.log("Session update");
        const trainer = await trainerModels.findById(trainerId);

        if (!trainer) {
            throw new Error("Trainer not found");
        }

        // Convert userId string to ObjectId
        const userId = session.userId;

        // Find the user by userId and update the sessionTime
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Add the session to the trainer's sessions array
        trainer.sessions?.push(session);
        await trainer.save();
        const newSessionId = trainer?.sessions && trainer.sessions.length > 0
        ? trainer.sessions[trainer.sessions.length - 1]._id
        : null;
        user.sessionTime = session.startTime;
        user.sessionId = newSessionId?.toString(); 
        await user.save();
        return trainer;
    } catch (error) {
        throw error;
    }
};
