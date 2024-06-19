
import {RatingRepository} from '../../database/repository/ratingRepository';
import {RatingAdapter} from '../../../adapter/ratingAdapter';
import TrainerModel from '../../database/model/trainerModel';
import RequestValidator from '../../services/validateRepository';
import {RatingUseCase}  from '../../../useCase/usecases/ratingUseCase';


const ratingRepository = new RatingRepository(TrainerModel);
const requestValidator = new RequestValidator();
const ratingusecase = new RatingUseCase(requestValidator,ratingRepository);
const ratingAdapter = new RatingAdapter(ratingusecase);

export {ratingAdapter};
