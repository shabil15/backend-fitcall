import express ,{NextFunction,Request,Response}  from 'express';
import { trainerAdapter } from './injections/trainerInjection';
import AuthMiddleware from '../Middleware/authMiddleware';

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
  AuthMiddleware.protectTrainer,
  (req:Request, res:Response,next:NextFunction) =>
    trainerAdapter.updateProfile(req,res,next)
)

router.patch(
  "/addProfile",
  AuthMiddleware.protectTrainer,
  (req:Request, res:Response, next:NextFunction) =>
    trainerAdapter.addProfile(req,res,next)
)

router.post(
  "/getClients",
  AuthMiddleware.protectTrainer,
  (req:Request,res:Response,next:NextFunction) => 
    trainerAdapter.getClients(req,res,next)
)

router.patch(
  "/addDescription/:trainerId",
  AuthMiddleware.protectTrainer,
  (req:Request,res:Response,next:NextFunction)=> 
    trainerAdapter.addDescription(req,res,next)
)

router.patch(
  "/addExperience/:trainerId",
  AuthMiddleware.protectTrainer,
  (req:Request,res:Response,next:NextFunction)=> 
    trainerAdapter.addExperience(req,res,next)
)

router.post(
  "/addsession", 
  AuthMiddleware.protectTrainer,
  (req:Request, res:Response,next:NextFunction) => 
  trainerAdapter.addSession(req, res,next)
);

router.get(
  "/:trainerId/sessions",
  AuthMiddleware.protectTrainer,
  async(req:Request,res:Response,next:NextFunction) =>
    trainerAdapter.getSessions(req,res,next) 
)

router.delete("/:trainerId/sessions/:sessionId",
  async(req:Request, res:Response,next:NextFunction) => 
    trainerAdapter.removeSession(req,res,next)
);

export default router