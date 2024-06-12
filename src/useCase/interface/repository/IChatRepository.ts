import { IMessage } from "../../../domain/message";
import { IConversationData } from "../services/Iresponse";

export interface IChatRepository{
   createConversation(senderId:string,receiverId:string): Promise<string>;
   findConversation(senderId:string,receiverId:string):Promise<IConversationData | undefined>;
}
