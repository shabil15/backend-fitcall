import UserModel from "../database/model/userModel";
import cron from 'node-cron';
import TrainerModel from '../database/model/trainerModel';

const checkSubscription = async () => {
    try {
        console.log('Checking subscriptions');
        const now = new Date();       

const usersToUpdate = await UserModel.find({
    $and: [
        { 'subscriptions.isActive': true },
        { 'subscriptions.end': { $lte: now } }
    ]
});



        console.log(usersToUpdate, 'usersToUpdate');

        for (const user of usersToUpdate) {
            if (user && user.subscriptions && user.subscriptions.length > 0) {
                const activeSubscription = user.subscriptions.find(sub => sub.isActive && new Date(sub.end) <= now);
                const trainerId = user.trainerId
                const trainer = await TrainerModel.findOne({_id:trainerId}).select("-password");
                if(trainer){
                    trainer.clientCount = trainer.clientCount?trainer.clientCount - 1 : 0 ;
                    await trainer.save();
                }
                if (activeSubscription) {
                    activeSubscription.isActive = false; 
                    user.isSubscribed = false;
                    user.trainerId = "";
                    await user.save();
                    console.log(`User ${user.name} has been unsubscribed`);
                }
            }
        }
    } catch (error) {
        console.error('Error checking subscriptions:', error);
        throw error;
    }
}

cron.schedule('0 0 * * *', checkSubscription);

export default checkSubscription;
