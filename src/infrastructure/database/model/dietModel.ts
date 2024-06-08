import mongoose, { Document, Schema } from "mongoose";
import { IDiet} from "../../../domain/diet";


const dietSchema: Schema<IDiet & Document> = new Schema(
  {
    morning: { type: String, default:"" },
    noon:{ type: String, default:"" },
    evening: { type: String, default:"" },
    night: { type: String, default:"" },
    additionalInstructions: { type: String, default:"" },
  },
  { _id: false } 
);

const DietModel = mongoose.model<IDiet & Document>(
  "Diet",
  dietSchema
);

export { dietSchema, DietModel };