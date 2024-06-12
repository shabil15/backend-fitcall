import { IChatRepository } from "../interface/repository/IChatRepository";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import { createConversation } from "./chat/createConversation";


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
        recieverId
    }:{
        senderId:string,
        recieverId:string
    }){
        return createConversation(
            this.requestValidator,
            this.chatRepository,
            senderId,
            recieverId); 
    }
}