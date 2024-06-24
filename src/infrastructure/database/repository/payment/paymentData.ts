import { paymentDatas } from "../../../../useCase/interface/services/Iresponse";
import UserModel from "../../model/userModel";
import { createNotification } from "../../../services/notification";

export const paymentData = async (
    email: string,
    amount: number,
    transactionId: string,
    userId: string,
    userModels: typeof UserModel
): Promise<paymentDatas | any> => {
    try {
        const user = await userModels.findOne({ email: email }).select("-password");
        if (user) {
            if(amount == 36000){
            if(user.subscriptions){            
           
                const currentSub = user.subscriptions[user.subscriptions.length-1]
                currentSub.plan = 'Annual'
                currentSub.end = new Date(currentSub.end.getFullYear(), currentSub.end.getMonth()+11, currentSub.end.getDate())
                currentSub.paymentId = transactionId;
                currentSub.amount = 39999;

                createNotification('Subscription Update',"Subscription plan changed to monthly plan to Annual Plan", user?._id)

            }
            }else{
            let now = new Date();
            const subscriptionPlan = amount == 3999 ? 'Monthly' : 'Annual';
            const subscriptionEnd = subscriptionPlan === 'Monthly'
                ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
                : new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());

            user.subscriptions?.push({
                plan: subscriptionPlan,
                start: now,
                end: subscriptionEnd,
                paymentId: transactionId,
                amount: amount,
                isActive:true,
            })
        }
            user.isSubscribed = true;
            await user.save();
            const responseData: paymentDatas = {
                user:user,
                amount: amount,
                transactionId: transactionId,
                userId: userId,
                message: 'Payment Successfull',
            }
            createNotification('Subscription Success',`Your Subscription is Successfull `, user?._id)

            return responseData
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}