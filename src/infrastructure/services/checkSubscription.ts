import UserModel from "../database/model/userModel";
import cron from 'node-cron';

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
                
                if (activeSubscription) {
                    activeSubscription.isActive = false; 

                    user.isSubscribed = false;

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
