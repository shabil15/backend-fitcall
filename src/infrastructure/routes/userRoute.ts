import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userinjection";

const router = express.Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.createUser(req, res, next)
);

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.loginUser(req, res, next)
);

router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.sendEmail(req, res, next)
);

router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.emailVerification(req, res, next)
);

router.post('/googleAuth',(req:Request,res:Response,next:NextFunction)=>
  userAdapter.googleAuth(req,res,next)
)

router.post(
  "/sendOTPforgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sendOtpFogotPassword(req, res, next)
);

router.post(
  "/forgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.forgotPassword(req, res, next)
);

 router.post(
  "/logout",
  (req:Request,res:Response,next:NextFunction) => 
    userAdapter.logoutUser(req,res,next)
 )

 router.get(
  "/getTrainers",
  (req:Request,res:Response,next:NextFunction) => 
    userAdapter.getTrainers(req,res,next)
 )

 router.get(
  "/trainers/profile",
  (req:Request,res:Response,next:NextFunction) =>
    userAdapter.getTrainerDetails(req,res,next)
 )

 router.patch("/addProfile",
 (req: Request, res: Response, next: NextFunction) =>
  userAdapter.addProfile(req, res, next)
);

router.patch("/updateProfile",
 (req: Request, res: Response, next: NextFunction) =>
  userAdapter.updateProfile(req, res, next)
);
 
export default router;
