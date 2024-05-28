import UserModel from "../database/model/userModel";
import cron from 'node-cron';

const checkSubscription = async () => {
    try {
        const now = new Date();

        const userstoUpdate = await UserModel.find({
            subscriptionExpiryDate: {
                $lte: now
            }
        })

        for(const user of userstoUpdate){
            user.isSubscribed = false;
            // user.subscriptionExpiryDate = null;
            await user.save();
            console.log(`User ${user.name} has been unsubscribed`);
        }
    } catch (error) {
        throw error;
    }
}

cron.schedule('0 0 * * *', checkSubscription);

export default checkSubscription;