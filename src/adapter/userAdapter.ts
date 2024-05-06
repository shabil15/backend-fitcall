import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { UserUseCase } from "../useCase/usecases/userUseCase";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase;
  }

  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.status(newUser.status).json({
          success: newUser.success,
          message: newUser.message,
        });
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyemail(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.emailVerification(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
        });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);
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

  async googleAuth(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.googleAuth(req.body);
      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

      res.status(user.status).json({
        success: user.success,
        data: user.data,
        message: user.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendOtpFogotPassword(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.sendOtpFogotPassword(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req:Req,res:Res,next: Next) {
    try {
      const newUser= await this.userusecase.forgotPassword(req.body)
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(newUser.status).json({
        success: newUser.success,
        message: newUser.message,
        user: newUser.data,
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req:Req,res:Res,next:Next) {
    try {
      res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
      });
      res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
      next(error)
    }
  }

  async getTrainers(req:Req,res:Res,next:Next) {
    try {
      console.log("getTraienrs");
      const traiers = await this.userusecase.findAcceptedTrainers();
      traiers && 
      res.status(traiers.status).json({
        success:traiers.success,
        data:traiers.data,
      })
    } catch (error) {
      next(error)
    }
  }
}
