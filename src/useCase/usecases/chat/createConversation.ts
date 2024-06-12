import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IRequestValidator } from "../../interface/repository/IValidRepository";
import { ConversationResponse } from "../../interface/services/Iresponse";

export const createConversation = async (
  requestValidator: IRequestValidator,
  chatRepository: IChatRepository,
  senderId: string,
  recieverId:string
):Promise<string | ConversationResponse> => {
    try {
        const validation = requestValidator.validateRequiredFields(
            {senderId,recieverId},
            [
            "recieverId",
            "recieverId"
            ]
        );

        if(!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const conversation = await chatRepository.findConversation(senderId,recieverId);
        if(!conversation) {
            const createnewConversation = await chatRepository.createConversation(senderId,recieverId);
            return createnewConversation;
        }

        return {
            status:200,
            success:true,
            data: conversation
        }
    } catch (error) {
        throw error
    }
}