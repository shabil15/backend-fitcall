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

      res.cookie("userjwt", newUser.token, {
        httpOnly: true,
        sameSite: "strict", 
        maxAge: 30 * 24 * 60 * 60 * 1000,   
      });

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
      const { page = 1, per_page = 4, specialisation, language, search } = req.query;
      
      const trainers = await this.userusecase.findAcceptedTrainers(+page,
        +per_page,
        specialisation?.toString() || "", // Provide default value if specialisation is undefined
        language?.toString() || "", // Provide default value if language is undefined
        search?.toString() || "" // Provide default value if search is undefined);
      )
      trainers && 
      res.status(trainers.status).json({
        success:trainers.success,
        data:trainers.data,
        total:trainers.total
      })
    } catch (error) {
      next(error)
    }
  }

  async getTrainerDetails(req:Req,res:Res,next:Next) {
    try{
      const {id} = req.query;
      if (typeof id === 'string') {
        const trainer = await this.userusecase.getTrainerDetails(id);
        trainer && 
        res.status(trainer.status).json({
          success:trainer.success,
          data:trainer.data
        });
      } else {
        res.status(400).json({ success: false, message: 'Invalid id' });
      }
    }catch(error){
      next(error);
    } 
  }

  async addProfile(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.addProfile(req.body);
      user &&
      res.status(user.status).json({
        success: user.success,
        message: user.message,
        user: user.data,
      });
    } catch (err) {
      next(err);
    }
  }


  async updateProfile(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.updateProfile(req.body);
      user &&
      res.status(user.status).json({
        success: user.success,
        message: user.message,
        user: user.data,
      });
    } catch (err) {
      next(err);
    }
  }


  async payment(req: Req, res: Res, next: Next) {

    try {

        console.log('payment entered')

        const payment = await this.userusecase.createPayment(req.body)


        // console.log('the payment status in controller is :', payment)


        res.status(payment.status).json({
            data: payment.data,

        })


    } catch (error) {
        // console.log('the payment controller error is ', error)
        next(error)

    }
}



async webhook(req: Req, res: Res, next: Next) {

    try {

        let transactionId;

        // Parse the incoming webhook event
        const event = req.body;
      console.log('Webhook entered');
        console.log('webhook evemt',event);

        // Check the type of event
        switch (event.type) {


            case 'checkout.session.completed':
                // Handle charge succeeded event
                const session = event.data.object;
                const metadata = session.metadata;
                const email = metadata.email;
                const userId = metadata.userId;
                const amount = metadata.amount;

                // console.log('the session is :', session)



                transactionId = event.data.object.payment_intent;

                // console.log('The transaction id is :', transactionId);

                await this.userusecase.finalConfirmation({ email, amount, transactionId, userId })


                break;



            default:
                console.log(`Unhandled event type: ${event.type}`);
        }


        

        // Respond with a success message
        res.status(200).json({ received: true });
    } catch (error) {
        next(error);
    }
}

}
