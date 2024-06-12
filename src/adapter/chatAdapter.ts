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


    async createMessage(req:Req,res:Res,next:Next) {
        try{
            const newMessage = await this.chatusecase.createMessage(req.body);
            newMessage && res.status(200).json({
                newMessage,
            })
        }catch(err){
            next(err);
        }
    }

    async getMessage(req:Req,res:Res,next:Next){
        try{
            const conversationId = req.query.conversationId as string;
            const message = await this.chatusecase.getMessage(conversationId);
            message && 
            res.status(200).json({
                message
            });
        }catch(err) {
            next(err);
        }
    }
}