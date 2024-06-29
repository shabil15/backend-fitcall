import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../../../domain/user";
import { subscriptionSchema } from "./subscriptionModel";
import { ISubscription } from "../../../domain/subscription";
import { dietSchema } from "./dietModel";
import { IDiet } from "../../../domain/diet";

const userSchema: Schema = new Schema<IUser & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    profile_img: { type: String, default: "" },
    isBlocked: { type: Boolean, default: false },
    isSubscribed:{type:Boolean, default: false},
    subscriptions: { type: [subscriptionSchema], default: [] },
    trainerId: { type: String, default: null },
    age:{type:String,default:""},
    height:{type:String,default:""},
    weight:{type:String,default:""},
    goal:{type:String,default:""},
    diet:dietSchema,
    sessionTime:{type:String,default:""},
    sessionId: { type: String, default: "" },
    testResult: { type: String,default: "" },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);

export default UserModel;
