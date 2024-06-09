import mongoose, { Document, Schema } from "mongoose";
import { ISubscription } from "../../../domain/subscription";


const subscriptionSchema: Schema<ISubscription & Document> = new Schema(
  {
    plan: { type: String, enum: ["Monthly", "Annual"], required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    isActive:{type:Boolean,default:false},
    cancelledAt: { type: Date, default: null },
  },
  { _id: false } 
);

const SubscriptionModel = mongoose.model<ISubscription & Document>(
  "Subscription",
  subscriptionSchema
);

export { subscriptionSchema, SubscriptionModel };
