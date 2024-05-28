import { paymentDatas } from "../../../../useCase/interface/services/Iresponse";
import UserModel from "../../model/userModel";


export const paymentData = async (
    email:string,
    amount:number,
    transactionId:string,
    userId:string,
    userModels:typeof UserModel
):Promise<paymentDatas |any> => {
    try {
        const user = await userModels.findOne({email:email}).select("-password");
        if(user) {
            let now = new Date();
            const subscriptionPlan = amount == 3999 ? 'Monthly' : 'Annual';
            const subscriptionEnd = subscriptionPlan === 'Monthly'
        ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        : new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());
            
            user.subscriptions?.push({
                plan:subscriptionPlan,
                start:now,
                end:subscriptionEnd,
                paymentId:transactionId,
                amount:amount,
            })
            user.isSubscribed = true;
            await user.save();
            const responseData:paymentDatas={
                _id:user._id,  
                name:user.name,
                email:user.email,
                amount:amount,
                transactionId:transactionId,
                userId:userId,
                message:'Payment Successfull',
            }
            return responseData
        }else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}