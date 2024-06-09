import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const createRefund = async (
  userId:string,
  userModels: typeof UserModel
): Promise<IUser> => {
  try {
    const user = await userModels.findById(userId);
    if (!user) throw new Error('User not found');
    
    if(user && user.subscriptions){
      user.subscriptions[user.subscriptions.length-1].isActive = false;
      user.subscriptions[user.subscriptions.length-1].cancelledAt = new Date();
      user.isSubscribed = false;
    }

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};