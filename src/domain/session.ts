import mongoose from "mongoose";

export interface ISession {
    userId:typeof mongoose.Types.ObjectId;
    startTime:string;
  }