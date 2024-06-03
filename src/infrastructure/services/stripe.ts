import Stripe from 'stripe';
require('dotenv').config();
const private_stripe_key = process.env.SECRET_STRIPE_KEY;

const stripe = new Stripe(`${private_stripe_key}`,{ apiVersion: "2024-04-10"});
import IStripe from '../../useCase/interface/services/IStripe';
import { IResponse } from '../../useCase/interface/services/Iresponse';

class StripeService implements IStripe {
async createPaymentIntent(
    amount: number,
    email: string,
    userId: string
): Promise<IResponse> {
    console.log(amount);
    console.log(email);
    console.log(userId);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: amount===3999?'Monthly Plan':'Annual Plan',
                        images:["https://github.com/shabil15/FITCALL-LOGO/blob/main/Group%20880%20(1).png"]
                    },
                    unit_amount: amount *100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4000/myplan',
        cancel_url: 'http://localhost:4000',
        metadata: {
            email: email,
            userId: userId,
            amount: amount,
        },
    })
    console.log(session);
    console.log('this stipe session id is ' + session.id);

    return {
        status: 200,
        success: true,
        data: session.id,
    }

}
}

export default StripeService