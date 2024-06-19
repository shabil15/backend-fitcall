import TrainerModel from "../../model/trainerModel";

export const getAverageRating = async (trainerId:string) => {
    const trainer = await TrainerModel.findById(trainerId).select('ratings');
    if(!trainer ||!trainer.ratings || trainer?.ratings?.length ===0 ) return 0;

    const totalRating = trainer?.ratings?.reduce((sum,rating)=> sum + (rating.rating || 0) ,0);
    return totalRating / trainer?.ratings?.length;

}