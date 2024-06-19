import { ITrainer } from "../../../domain/trainer";
import { IRating } from "../../../domain/rating";

export interface IRatingRepository {
    addRating(trainerId:string,rating:IRating):Promise<ITrainer | null>;
    getAverageRating(trainerId:string):Promise <number>;
}