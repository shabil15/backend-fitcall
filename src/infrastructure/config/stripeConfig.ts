import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.SECRET_STRIPE_KEY}`, {
  apiVersion: '2024-04-10',
});

export default stripe;
