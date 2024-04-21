import { Next,Req,Res } from "../infrastructure/types/expressTypes";
import { UserUseCase } from "../useCase/usecases/userUseCase";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase:UserUseCase){
    this.userusecase = userusecase;
  }


  async createUser(req:Req,res:Res,next:Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser && 
      res.status(newUser.status).json({
        success: newUser.success,
        message:newUser.message,
      })
    } catch (error) {
      next(error)
    }
  }
}