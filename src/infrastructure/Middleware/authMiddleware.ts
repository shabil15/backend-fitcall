import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { AdminRepository } from '../database/repository/adminRepository';
import { TrainerRepository } from '../database/repository/trainerRepository';
import { IUser } from '../../domain/user';
import { IAdmin } from '../../domain/admin';
import UserModel from '../database/model/userModel';
import AdminModel from '../database/model/adminModel';
import TrainerModel from '../database/model/trainerModel';

declare global {
  namespace Express {
    interface Request{
    user?:IUser | IAdmin;
    }
  }
}


class AuthMiddleware {
  static async protectUser(req:Request,res:Response,next:NextFunction):Promise<void> {
    let token: string | undefined;
    console.log('User protect');
    token = req.cookies.userjwt;

    const userRepository = new UserRepository(UserModel);

    if(token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const user = await userRepository.findUser(decoded.email);
        if (user) {
          req.user = user;
          console.log('before next');
          next();
        } else {
          console.error('User not found');
          res.status(404).send('User not found');
        }
      } catch (error) {
        console.error(error);
        res.status(401).send('Not Authorized, no token');
      }
    }else {
      console.log('No token');
      res.status(401).send('Not authorized ,no token');
      
    }
    
  }

  static async protectAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    let token: string | undefined;

    console.log('Admin protect');
    token = req.cookies.adminjwt;

    const adminRepository = new AdminRepository(AdminModel);

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const admin = await adminRepository.findAdmin(decoded.email);
        if (admin) {
          req.user = admin;
          console.log('before next');
          next();
        } else {
          console.error('Admin not found');
          res.status(404).send('Admin not found');
        }
      } catch (error) {
        console.error(error);
        res.status(401).send('Not authorized, no token');
      }
    } else {
      console.log('No token');
      res.status(401).send('Not authorized, no token');
    }
  }

  static async protectTrainer(req: Request, res: Response, next: NextFunction): Promise<void> {
    let token: string | undefined;

    console.log('trainer protect');
    token = req.cookies.trainerjwt;

    const trainerRepository = new TrainerRepository(TrainerModel,UserModel)

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
        const trainer = await trainerRepository.findTrainer(decoded.email);
        if (trainer) {
          req.user = trainer;
          console.log('before next');
          next();
        } else {
          console.error('trainer not found');
          res.status(404).send('trainer not found');
        }
      } catch (error) {
        console.error(error);
        res.status(401).send('Not authorized, no token');
      }
    } else {
      console.log('No token');
      res.status(401).send('Not authorized, no token');
    }
  }

  static async checkBlockedStatus(req: Request, res: Response, next: NextFunction){
    console.log('trainer protect');
    const token = req.cookies.userjwt;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);

      const userRepository = new UserRepository(UserModel);
      const user = await userRepository.findUser(decoded.email);

      if (user) {
        if (user.isBlocked) {
          return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
        }

        req.user = user;

        next();
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }


}

export default AuthMiddleware;