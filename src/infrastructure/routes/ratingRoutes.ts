import express,{NextFunction,Request,Response} from "express";
import {ratingAdapter} from './injections/ratingInjection';

const router = express.Router();

router.post(
    "/addRating",
    (req:Request,res:Response,next:NextFunction) => 
      ratingAdapter.addRating(req,res,next)
  )


  router.get(
    '/average/:trainerId',
   (req:Request, res:Response, next:NextFunction) =>
     ratingAdapter.getAverageRating(req, res, next));  

  export default router;