import express,{NextFunction,Request,Response} from "express";
import {chatAdapter}  from './injections/chatInjection';

const router = express.Router();

router.post(
    "/conversation",
    (req:Request,res:Response,next:NextFunction) =>
        chatAdapter.createConversation(req,res,next)
)

router.post(
    "/message",
    (req:Request,res:Response,next:NextFunction) => 
        chatAdapter.createMessage(req,res,next)
)


router.get(
    "/message",
    (req:Request,res:Response,next:NextFunction) => 
        chatAdapter.getMessage(req,res,next)
);

export default router;