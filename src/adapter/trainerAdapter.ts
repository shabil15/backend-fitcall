import { Next,Req,Res } from "../infrastructure/types/expressTypes";
import { TrainerUseCase } from "../useCase/usecases/trainerUseCase";

export class TrainerAdapter{
  private readonly trainerusecase: TrainerUseCase;

  constructor(trainerusecase:TrainerUseCase){
    this.trainerusecase= trainerusecase;
   }

  async createTrainer(req:Req,res:Res,next:Next) {
    try {
      const newTrainer  = await this.trainerusecase.createTrainer(req.body);
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
}
