import { IMessage } from "../../../domain/message";
import { IChatRepository } from "../../../useCase/interface/repository/IChatRepository";
import { IConversationData ,MessageResponse} from "../../../useCase/interface/services/Iresponse";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import { createConversation } from "./chat/createConversation";
import { findConversation } from "./chat/findConversation";

export class ChatRepository implements IChatRepository{
    constructor(
        private readonly conversationModel:typeof ConversationModel,
        private readonly messageModel:typeof MessageModel
    ){}

    async createConversation(senderId: string, receiverId: string): Promise<string> {
        return createConversation(senderId, receiverId, this.conversationModel);
    }

     async findConversation(senderId: string, receiverId: string): Promise<IConversationData | undefined> {
        return findConversation(senderId, receiverId, this.conversationModel);    
    }
}