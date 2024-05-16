import  TrainerModel  from '../../model/trainerModel';
import { ITrainer } from '../../../../domain/trainer';

export const getTrainerData = async (trainerId:string): Promise<ITrainer | null>  => {
  try {
    const trainer = await TrainerModel.findById(trainerId).select('-password');
    return trainer;
  } catch (error) {
    throw new Error(`Error fetching trainer by ID:${error}`);
  }
}