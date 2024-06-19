import { IRating } from "../../domain/rating";
import { IRequestValidator } from "../interface/repository/IValidRepository";
import { addRating } from "./rating/addRating";
import { IRatingRepository } from "../interface/repository/IRatingRepository";
import { getAverageRating } from "../../infrastructure/database/repository/rating/getAverageRating";

export class RatingUseCase {
    
    private readonly requestValidator: IRequestValidator;
    private readonly ratingRepository:IRatingRepository;
  
    constructor(
      
      requestValidator: IRequestValidator,
      ratingRepository:IRatingRepository,

    ) {
      
      this.requestValidator = requestValidator;
      this.ratingRepository = ratingRepository;
    }

    async addRating(trainerId:string,rating:IRating) {
        return addRating(this.requestValidator,this.ratingRepository,trainerId,rating);
      }
      
    async getAverageRating(trainerId:string){
      return this.ratingRepository.getAverageRating(trainerId);
    }
    
}
