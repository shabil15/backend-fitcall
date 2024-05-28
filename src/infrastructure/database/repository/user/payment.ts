import { StoreData } from "../../../../useCase/interface/services/Iresponse";
import UserModel from "../../model/userModel";

export const payment = async (
    email:string,
    userModels:typeof UserModel
):Promise<StoreData | never >=> {
    try {
        const user = await userModels.findOne({email:email}).select("-password");
        if(user) {
           const responseData = {
            _id:user._id,
            name:user.name,
            email:user.email
           }
           return responseData
           
        }else {
            throw new Error("Internal server error");
        }
    }catch(error) {
        throw error;
    }
}