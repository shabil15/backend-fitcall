import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const getAllSubs = async () => {
        const subscriptions = await UserModel.aggregate([
            {$unwind: "$subscriptions"},
            {
                $project: {
                    name: 1,
                    "subscriptions.paymentId":1,
                    "subscriptions.plan":1,
                    "subscriptions.start":1,
                    "subscriptions.end":1,
                    "subscriptions.amount":1,
                    goal:1,
                },
            },
        ]);
        return subscriptions;
}