import { Model, Document } from 'mongoose';
import { IRating } from '../../../domain/rating';
import { ITrainer } from '../../../domain/trainer';
import { addRating } from './rating/addRating';
import { IRatingRepository } from '../../../useCase/interface/repository/IRatingRepository';
import TrainerModel from '../model/trainerModel';
import { getAverageRating } from './rating/getAverageRating';

export class RatingRepository implements IRatingRepository {
    constructor(private readonly trainerModel: typeof TrainerModel) {}

    async addRating(trainerId: string, rating: IRating): Promise<ITrainer | null> {
        return addRating(trainerId, rating, this.trainerModel);
    }

     async getAverageRating(trainerId: string): Promise<number> {
       return getAverageRating(trainerId);
    }
}

const ratingRepository = new RatingRepository(TrainerModel);
export default ratingRepository;