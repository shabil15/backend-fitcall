import mongoose, { Document, Schema, Model } from 'mongoose';
import {ISession} from  "../../../domain/session";

const sessionSchema = new Schema<ISession>({
  userId: { type: mongoose.Types.ObjectId ,ref: 'User',required: true },
  startTime: { type:String, required: true },
},
{ _id: false } 
);

const SessionModel: Model<ISession> = mongoose.model<ISession>('Session', sessionSchema);

export  {sessionSchema,SessionModel}
