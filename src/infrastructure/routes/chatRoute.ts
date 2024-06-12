import express,{NextFunction,Request,Response} from "express";
import {chatAdapter}  from './injections/chatInjection';

const router = express.Router();

router.post(
    "/conversation",
    (req:Request,res:Response,next:NextFunction) =>
        chatAdapter.createConversation(req,res,next)
)

export default router;