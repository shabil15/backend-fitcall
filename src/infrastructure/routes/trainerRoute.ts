import express ,{NextFunction,Request,Response}  from 'express';
import { trainerAdapter } from './injections/trainerInjection';

const router = express.Router();

router.post(
  "/signup",
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.createTrainer(req,res,next)
)

export default router