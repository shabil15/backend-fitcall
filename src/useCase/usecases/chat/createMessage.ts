import {IMessage } from '../../../domain/message';
import ErrorResponse from '../../handler/errorResponse';
import {IChatRepository} from '../../interface/repository/IChatRepository';
import {IRequestValidator} from '../../interface/repository/IValidRepository';

export const createMessage = async (
    requestValidator:IRequestValidator,
    chatRepository:IChatRepository,
    conversationId:string,
    senderId:string,
    receiverId:string,
    text:string
):Promise<IMessage> => {
    try{
        const validation  = requestValidator.validateRequiredFields(
            {conversationId,senderId,receiverId,text},
            ["conversationId",
            "senderId",
            "receiverId",
            "text"
            ]
        );

        if(!validation.success){
            throw ErrorResponse.badRequest(validation.message as string);
        }

        console.log(conversationId,'conversationId');

        const newMessage = {
            conversationId,
            senderId,
            receiverId,
            text
        }
        const createNewMessage = await chatRepository.createMessage(newMessage);
        return createNewMessage
    }catch(err){
        throw err;
    }
}