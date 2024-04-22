import mongoose, { Document, Model, Schema } from "mongoose";
import { ITrainer } from "../../../domain/trainer";

const trainerSchema: Schema = new Schema<ITrainer & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    description: { type: String, default: "" },
    language: { type: String, required: true },
    profile_img: { type: String, default: "" },
    certificate: { type: String, default: "" },
    status: { type: String, default: "pending" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TrainerModel: Model<ITrainer & Document> = mongoose.model<
  ITrainer & Document
>("Trainer", trainerSchema);

export default TrainerModel;
