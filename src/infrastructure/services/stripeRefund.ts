import stripe from '../config/stripeConfig';

export class StripeService1 {
   async createRefund(paymentId: string, amount: number){
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentId,
        amount: amount,
      });
      return refund;
    } catch (error:any) {
      throw new Error(`Error creating refund: ${error.message}`);
    }
  }
}
