import UserModel from "../../../infrastructure/database/model/userModel";
import { IUserResponse } from "../../interface/services/Iresponse";
import { findById } from "../../../infrastructure/database/repository/user/findById";
import { ISubscription } from "../../../domain/subscription";

export const getSubscription = async(trainerId:string): Promise<ISubscription[] | undefined> =>{
    try{
        const user = await findById(trainerId,UserModel);
        if (user === null) {
            throw new Error("User not found");
        }
        return user.subscriptions;
    }catch(error){
        throw new Error(error as string);
    }
} 