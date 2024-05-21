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
            
            user.subscriptionPlan = 'Annual Plan'
            
            await user.save();
            const responseData:paymentDatas={
                _id:user._id,
                name:user.name,
                email:user.email,
                amount:amount,
                transactionId:transactionId,
                userId:userId
            }
            return responseData
        }else {
            throw new Error("User not found");
        }
    } catch (error) {
        
    }
}