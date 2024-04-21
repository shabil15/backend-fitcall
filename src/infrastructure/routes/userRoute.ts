import express, {NextFunction,Request,Response} from 'express';
import { userAdapter } from './injections/userinjection';


const router = express.Router();

router.post(
  "/signup",
  (req:Request,res:Response,next:NextFunction) => 
    userAdapter.createUser(req,res,next)
);

export default router