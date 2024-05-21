import ErrorResponse from "../../handler/errorResponse";
import { IResponse } from "../../interface/services/Iresponse";
import IStripe from "../../interface/services/IStripe";

export const createPayment = async (
  stripe: IStripe,
  amount: number,
  email: string,
  userId: string
  ): Promise<IResponse> => {
  try {
    const res = await stripe.createPaymentIntent(amount,email, userId); 

    if(res){
        return {
            status: 200,
            success: true,
            message:'created',
            data: res.data
        }
    }
    throw ErrorResponse.badRequest("Payment creation Failed");
} catch (err) {
    console.log(err);
    throw err;
}
}

