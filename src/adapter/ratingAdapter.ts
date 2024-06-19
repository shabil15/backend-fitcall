import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { RatingUseCase } from "../useCase/usecases/ratingUseCase";

export class RatingAdapter {
  private readonly ratingusecase: RatingUseCase;

  constructor(ratingusecase: RatingUseCase) {
    this.ratingusecase = ratingusecase;
  }

  async addRating(req: Req, res: Res, next: Next) {
    try {
      console.log("add Rating")
      const { trainerId, user, rating,comment} = req.body;
      console.log(trainerId,user,rating,comment)

      const trainer = await this.ratingusecase.addRating(trainerId, { user,rating,comment });
      trainer &&
       res.status(trainer.status).json({
        message: trainer.message,
        success: trainer.success,
        trainer: trainer.data
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

  async getAverageRating(req:Req,res:Res,next:Next){
    try {
      const { trainerId } = req.params;
            const averageRating = await this.ratingusecase.getAverageRating(trainerId);
            res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

  

}