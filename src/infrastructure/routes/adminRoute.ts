import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import AuthMiddleware from "../Middleware/authMiddleware";

const router = express.Router();

router.post("/login", 
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req,res,next)
);

router.get(
  "/getUsers",
  //AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getUsers(req, res, next)
);

router.patch(
  "/users/unblock-block",
  // AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);


router.get(
  "/getJoinRequests",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getJoinRequests(req, res, next)
);

router.patch(
  "/reviewRequests",
  (req:Request,res:Response,next:NextFunction) => 
    adminAdapter.reviewRequests(req,res,next)
)

router.patch(
  "/trainer/unblock-block",
  (req:Request,res:Response,next:NextFunction) => 
    adminAdapter.block_unBlockTrainer(req,res,next)
)

router.post(
  "/logout",
  (req:Request,res:Response,next:NextFunction) =>
    adminAdapter.logoutAdmin(req,res,next)
)

export default router;
