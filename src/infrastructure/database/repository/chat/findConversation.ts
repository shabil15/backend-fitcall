import { IConversationData } from "../../../../useCase/interface/services/Iresponse";
import ConversationModel from "../../model/conversation";
import UserModel from "../../model/userModel";
import TrainerModel from "../../model/trainerModel";

export const findConversation= async(
    senderId: string,
    receiverId:string,
    conversationId:typeof ConversationModel
)=> {
    try {
        console.log('name in find conversation in conversationRepository --->>>> ', senderId," ",receiverId)
        const existingConversation = await conversationId.findOne({
            members:{$all:[senderId,receiverId]}
        });
        const user = await UserModel.findOne({$or:[{_id:senderId},{_id:receiverId}]});
        const trainer = await TrainerModel.findOne({$or:[{_id:senderId},{_id:receiverId}]});
        const data :IConversationData | undefined = existingConversation?{
            _id:existingConversation._id,
            members:existingConversation.members,
            user:user?.name || '',
            userEmail:user?.email || '',
            user_profile:user?.profile_img || '', 
            trainer:trainer?.name || '',
            trainer_profile:trainer?.profile_img || ''
        }:undefined;
        return data;      
    } catch (error) {
        throw error
    }
}