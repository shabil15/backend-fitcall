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
}
