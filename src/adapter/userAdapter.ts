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
          sameSite: "none",
          secure:true,
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
          secure:true,
          sameSite: "none",
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
          secure:true,
          sameSite: "none",
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

  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.forgotPassword(req.body)
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          secure:true,
          sameSite: "none", 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
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

  async logoutUser(req: Req, res: Res, next: Next) {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
        secure:true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error)
    }
  }

  async getTrainers(req: Req, res: Res, next: Next) {
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
          success: trainers.success,
          data: trainers.data,
          total: trainers.total
        })
    } catch (error) {
      next(error)
    }
  }

  async getTrainerDetails(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.query;
      if (typeof id === 'string') {
        const trainer = await this.userusecase.getTrainerDetails(id);
        trainer &&
          res.status(trainer.status).json({
            success: trainer.success,
            data: trainer.data
          });
      } else {
        res.status(400).json({ success: false, message: 'Invalid id' });
      }
    } catch (error) {
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
      console.log('webhook evemt', event);

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

  async updateHealth(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.updateHealth(req.body);
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

  async setTrainer(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.setTrainer(req.body);
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


  async getUser(req: Req, res: Res, next: Next) {
    try {
      const { email } = req.query;
      if (typeof email === 'string') {
        const user = await this.userusecase.getUser(email);
        user &&
          res.status(user.status).json({
            success: user.success,
            user: user.data,
          });
      } else {
        res.status(400).json({ success: false, message: 'Invalid id' });
      }
    } catch (error) {
      next(error);
    }
  }


  async getSubscription(req:Req,res:Res,next:Next){
    try {
      const {userId}  = req.params;
      if(!userId) {
        res.status(400).json({message:"User ID is required"});
        return;
      }

      const subscriptions = await this.userusecase.getSubscription(userId);
      if(!subscriptions || subscriptions.length === 0) {
        res.status(404).json({message:"No subscriptions found"});
        return;
      }
      subscriptions.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


  async updateDiet(req:Req, response:Res, next:Next) {
    try {
      const {userId} = req.params;
      const { morning, noon, evening, night, additionalInstructions } = req.body;
      await this.userusecase.updateDiet(userId, { morning, noon, evening, night, additionalInstructions}); 
      response.status(200).json({ message: 'Diet updated successfully' });
    } catch (error) {
      response.status(500).json({message:"Internal Server Error"})
    }
  }

  async addTestRes(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.addTestRes(req.body);
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

  async createRefund(req: Req, res: Res,next:Next): Promise<void> {
    const { userId } = req.params;
    console.log('user refund ')

    try {
      const result = await this.userusecase.createRefund(userId);
      res.status(200).json({user:result,message:"Refund done successfully"});
      
    } catch (error:any) {
      console.error('Error cancelling subscription and creating refund:', error);
      res.status(500).json({ message: error.message });
      next(error)
    }
  }

  async getNotifications(req: Req, res: Res,next:Next) {
    const { userId } = req.params;
    console.log('user notification ')

    try {
      const result = await this.userusecase.getNotifications(userId);
      res.status(200).json({user:result,message:"notification fetched successfully"});
      
    } catch (error:any) {
      console.error('Error fetching notification:', error);
      res.status(500).json({ message: error.message });
      next(error)
    }
  }
}
