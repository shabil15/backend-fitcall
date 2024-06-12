import ErrorResponse from '../../handler/errorResponse';
import {IChatRepository } from '../../interface/repository/IChatRepository'
import {IRequestValidator} from '../../interface/repository/IValidRepository';
import {MessageResponse} from '../../interface/services/Iresponse';

export const getMessage = async(
    requestValidator:IRequestValidator,
    chatRepository:IChatRepository,
    conversationId:string
): Promise<MessageResponse |null > => {
    try{
        const validation = requestValidator.validateRequiredFields(
            {conversationId},
            ["conversationId",]
        );

        if(!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const message = await chatRepository.getMessage(conversationId);
        if(message) {
            return message
        }
        return null
    }catch(err){
        throw err;
    }
}