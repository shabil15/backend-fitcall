import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userinjection";
import AuthMiddleware from "../Middleware/authMiddleware";

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

router.post('/googleAuth', (req: Request, res: Response, next: NextFunction) =>
  userAdapter.googleAuth(req, res, next)
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
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.logoutUser(req, res, next)
)

router.get(
  "/getTrainers", 
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.getTrainers(req, res, next)
)

router.get(
  "/trainers/profile",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.getTrainerDetails(req, res, next)
)

router.patch("/addProfile", AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.addProfile(req, res, next)
);

router.patch("/updateProfile", AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.updateProfile(req, res, next)
);

router.post('/payment', AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
 (req: Request, res: Response, next: NextFunction) => {
  userAdapter.payment(req, res, next)
})


router.post('/webhook', 
 (req: Request, res: Response, next: NextFunction) => {
  userAdapter.webhook(req, res, next)
})

router.patch('/updateHealth', AuthMiddleware.protectUser,AuthMiddleware.checkBlockedStatus,
  (req: Request, res: Response, next: NextFunction) => {
    userAdapter.updateHealth(req, res, next)
  })

router.get(
  "/getUser",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.getUser(req, res, next)
)


router.patch(
  "/setTrainer", AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
  (req:Request,res:Response,next:NextFunction) => 
    userAdapter.setTrainer(req,res,next)
)

router.get("/subscriptionHistory/:userId", AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
(req:Request,res:Response,next:NextFunction) =>
  userAdapter.getSubscription(req, res, next)
);

router.put(
  "/update-diet/:userId",
  (req:Request,res:Response,next:NextFunction)=> 
    userAdapter.updateDiet(req,res,next)
)

router.patch("/addTestRes", AuthMiddleware.protectUser, AuthMiddleware.checkBlockedStatus,
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.addTestRes(req, res, next)
);

router.post('/:userId/refund',
  (req:Request,res:Response,next:NextFunction) => 
    userAdapter.createRefund(req,res,next)
)

router.get("/:userId/notifications", 
(req:Request,res:Response,next:NextFunction) =>
  userAdapter.getNotifications(req,res,next)
)




export default router;
