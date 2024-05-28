import UserModel from "../database/model/userModel";
import cron from 'node-cron';

const checkSubscription = async () => {
    try {
        console.log('Checking subscriptions');
        const now = new Date();

        // Find users with an active subscription that has expired
       

const usersToUpdate = await UserModel.find({
    $and: [
        { 'subscriptions.isActive': true },
        { 'subscriptions.end': { $lte: now } }
    ]
});



        console.log(usersToUpdate, 'usersToUpdate');

        for (const user of usersToUpdate) {
            if (user && user.subscriptions && user.subscriptions.length > 0) {
                // Find the active subscription that has expired
                const activeSubscription = user.subscriptions.find(sub => sub.isActive && new Date(sub.end) <= now);
                
                if (activeSubscription) {
                    // Set isActive to false for the expired subscription
                    activeSubscription.isActive = false; 

                    // Set user's overall subscription status to false
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

// Run the job every minute
cron.schedule('* * * * *', checkSubscription);

export default checkSubscription;
