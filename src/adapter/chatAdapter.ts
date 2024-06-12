import { Next,Req,Res } from "../infrastructure/types/expressTypes";
import { ChatUseCase } from "../useCase/usecases/chatUseCase";

export class ChatAdapter{
    private readonly chatusecase:ChatUseCase;

    constructor (chatusecase:ChatUseCase) {
        this.chatusecase = chatusecase;
    }


    async createConversation(req:Req,res:Res,next:Next){
        try{
            const newConversation = await this.chatusecase.createConversation(req.body);
            newConversation && res.status(200).json({newConversation});
        }
        catch(err){
            next(err);
        }
    }
}