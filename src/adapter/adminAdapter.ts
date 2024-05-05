import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { AdminUseCase } from "../useCase/usecases/adminUseCase";

export class AdminAdapter {
  private readonly adminusecase: AdminUseCase;

  constructor(adminusecase: AdminUseCase) {
    this.adminusecase = adminusecase;
  }

  async loginAdmin(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.loginAdmin(req.body);
      user &&
        res.status(user.status).json({
          succeess: user.success,
          data: user.data,
          message: user.message,
        });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.findAllUser();
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
        });
    } catch (error) {
      next(error);
    }
  }

  async blockUnblockUser(req: Req, res: Res, next: Next) {
    try {
      const _id = req.query.id as string;
      const user = await this.adminusecase.blockUnblockUser(_id);

      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
        });
    } catch (error) {
      next(error);
    }
  }

  async getJoinRequests(req: Req, res: Res, next: Next) {
    
    try {
      console.log("getUserDatas");
      const requests = await this.adminusecase.findAllRequests();
      requests &&
        res.status(requests.status).json({
          success: requests.success,
          data: requests.data,
        });
        console.log(requests);
    } catch (err) {
      next(err);
    }
  }

  async reviewRequests(req:Req,res:Res,next:Next) {
    try {
      const trainer = await this.adminusecase.reviewRequests(req.body);
      trainer && 
      res.status(trainer.status).json({
        success:trainer.success,
        data:trainer.data,
        messager:trainer.message,
      });
    } catch (error) {
      next(error)
    }
  }

  async block_unBlockTrainer(req:Req,res:Res,next:Next) {
    try {
      console.log("blockTrainer")
      const _id = req.query.id as string;
      
      const trainer = await this.adminusecase.block_unBlockTrainer(_id);
      trainer && 
        res.status(trainer.status).json({
          success:trainer.success,
          data:trainer.data,
          message:trainer.message
        })
    } catch (error) {
        next(error);      
    }
  }

  async logoutAdmin(req:Req,res:Res,next:Next) {
    try {
      res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
      })
      res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
      next(error)
    }
  }
  
}

