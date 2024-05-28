export interface ISubscription {
    plan: string;
    start: Date;
    end: Date;
    paymentId: string;
    amount: number;
  }