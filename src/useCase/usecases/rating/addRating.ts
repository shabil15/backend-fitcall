import ErrorResponse from "../../handler/errorResponse"
import { ITrainerRepository } from "../../interface/repository/ITrainerRepository"
import { IRequestValidator } from "../../interface/repository/IValidRepository"
import { ITrainerResponse } from "../../interface/services/Iresponse"
import { IRating } from "../../../domain/rating";
import { IRatingRepository } from "../../interface/repository/IRatingRepository";

export const addRating = async (
    requestValidator: IRequestValidator,
    ratingRepository:IRatingRepository,
    trainerId: string,
    rating:IRating,
): Promise<ITrainerResponse> => {
    try {
        const validation = await requestValidator.validateRequiredFields(
            { trainerId, rating },
            ["trainerId", "rating",]
        );

        if (!validation.success) {
            console.log('validation');
            throw ErrorResponse.badRequest(validation.message as string);
        }


        const updatedTrainer = await ratingRepository.addRating(trainerId, rating);

        return {
            status: 200,
            success: true,
            message: `Trainer Session Updated successfully`,
            data: updatedTrainer,
        }

    } catch (error) {
        throw error;
    }
}