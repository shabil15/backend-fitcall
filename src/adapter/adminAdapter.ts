import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { AdminUseCase } from "../useCase/usecases/adminUseCase";

export class AdminAdapter{
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
          message: user.message,
        });
    } catch (error) {
      next(error);
    }
  }
}
