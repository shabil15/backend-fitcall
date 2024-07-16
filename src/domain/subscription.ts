export interface ISubscription {
    plan: string;
    start: Date;
    end: Date;
    paymentId: string;
    amount: number;
    isActive:boolean;
    cancelledAt?: Date;     
  }

  export interface IUserSubscription {
    name: string;
    paymentId: string;
    plan: string;
    start: Date;
    amount: number;
    goal: string;
  }