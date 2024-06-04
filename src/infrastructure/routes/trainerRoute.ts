import express ,{NextFunction,Request,Response}  from 'express';
import { trainerAdapter } from './injections/trainerInjection';
import { Next } from '../types/expressTypes';

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

router.patch(
  "/updateTrainerProfile",
  (req:Request, res:Response,next:NextFunction) =>
    trainerAdapter.updateProfile(req,res,next)
)

router.patch(
  "/addProfile",
  (req:Request, res:Response, next:NextFunction) =>
    trainerAdapter.addProfile(req,res,next)
)

router.post(
  "/getClients",
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.getClients(req,res,next)
)




export default router