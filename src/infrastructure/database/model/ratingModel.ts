import mongoose, { Document, Schema } from "mongoose";
import { IRating } from "../../../domain/rating";


const ratingSchema: Schema<IRating & Document> = new Schema(
    {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
  { _id: false } 
);

const RatingModel = mongoose.model<IRating& Document>(
  "Rating",
  ratingSchema
);

export { ratingSchema, RatingModel };
