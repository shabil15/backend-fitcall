import express ,{NextFunction,Request,Response}  from 'express';
import { trainerAdapter } from './injections/trainerInjection';

const router = express.Router();

router.post(
  "/signup",
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.createTrainer(req,res,next)
)

router.post(
  "/login",
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.loginTrainer(req,res,next)
)

router.post(
  "/logout",
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.logoutTrainer(req,res,next)
)

export default router