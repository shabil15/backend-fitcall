import { Next,Req,Res } from "../infrastructure/types/expressTypes";
import { TrainerUseCase } from "../useCase/usecases/trainerUseCase";

export class TrainerAdapter{
  private readonly trainerusecase: TrainerUseCase;

  constructor(trainerusecase:TrainerUseCase){
    this.trainerusecase= trainerusecase;
   }

  async createTrainer(req:Req,res:Res,next:Next) {
    try {
      console.log("createTrainer");
      console.log("Req",req.body);
      const newTrainer  = await this.trainerusecase.createTrainer(req.body);
      console.log(newTrainer)
      newTrainer && 
      res.status(newTrainer.status).json({
        success:newTrainer.success, 
        message:newTrainer.message
      })
    } catch (error) {
      next(error)
    }
  }

  async loginTrainer(req:Req,res:Res,next:Next) {
    try {
      const trainer= await this.trainerusecase.loginTrainer(req.body);
      trainer && 
      res.cookie("trainerjwt",trainer.token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:30 *24 * 60 * 60 * 100,
      }) 

      res.status(trainer.status).json({
        success:trainer.success,
        data:trainer.data,
        message:trainer.message,
      })
    } catch (error) {
      next(error);
    }
  }

  async logoutTrainer(req:Req,res:Res,next:Next) {
    try {
      res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
      })
      res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
      next(error)
    }
  }
  
  async updateProfile(req:Req, res:Res,next:Next) {
    try {
      const trainer= await this.trainerusecase.updateProfile(req.body);
      trainer && 
      res.status(trainer.status).json({
        success:trainer.success,
        data:trainer.data,
        message:trainer.message,
      })
    } catch (error) {
      next(error)
    }
  }


  async addProfile(req:Req,res:Res,next:Next){
    try {
        const trainer= await this.trainerusecase.addProfile(req.body);
        trainer && 
        res.status(trainer.status).json({
          success:trainer.success,
          data:trainer.data,
          message:trainer.message,
        })
    } catch (error) {
      next(error)
    }
  }

  async getClients(req: Req, res: Res, next: Next) {
    try {
      const trainerId = req.body.trainerId as string;
      console.log(trainerId)
      if (!trainerId) {
        res.status(400).json({ message: "Trainer ID is required" });
        return;
      }
  
      const users = await this.trainerusecase.getClients(trainerId);
      console.log(users)
  
      if (!users || users.length === 0) {
        res.status(404).json({ message: "No users found for this trainer" });
        return;
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }



  

}
