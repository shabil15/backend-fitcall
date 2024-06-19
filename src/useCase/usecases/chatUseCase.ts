import { IChatRepository } from "../interface/repository/IChatRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { getMessage } from "./chat/getMessage";


export class ChatUseCase{
    private readonly chatRepository: IChatRepository;
    private requestValidator: IRequestValidator;

    constructor(
        serviceRepository:IChatRepository,
        requestValidator:IRequestValidator
    ){
        this.chatRepository = serviceRepository;
        this.requestValidator = requestValidator;
    }


    async createConversation({
        senderId,
        receiverId
    }:{
        senderId:string,
        receiverId:string
    }){
        return createConversation(
            this.requestValidator,
            this.chatRepository,
            senderId,
            receiverId); 
    }


    async createMessage({
        conversationId,
        senderId,
        receiverId,
        text
    }:{
        conversationId:string,
        senderId:string,
        receiverId:string,
        text:string,
    }){
        return createMessage(
            this.requestValidator,
            this.chatRepository,
            conversationId,
            senderId,
            receiverId,
            text
        )
    }

    async getMessage(conversationId:string) {
        return getMessage(
          this.requestValidator,
          this.chatRepository,
          conversationId
        );
      }
}