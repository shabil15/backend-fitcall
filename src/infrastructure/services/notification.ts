import Notification,{NotificationDocument} from "../database/model/notificationModel";
import mongoose, { Schema, Types } from 'mongoose';

export async function createNotification(title: string, message: string, userId: Schema.Types.ObjectId): Promise<NotificationDocument> {
    try {
        const newNotification = new Notification({ title, message, userId });
        const savedNotification = await newNotification.save();
        return savedNotification;
    } catch (error:any) {
        throw new Error(`Error creating notification: ${error.message}`);
    }
}

// Example function to fetch notifications for a specific user
export async function getNotificationsByUser(userId: Schema.Types.ObjectId): Promise<NotificationDocument[]> {
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).exec();
        return notifications;
    } catch (error:any) {
        throw new Error(`Error fetching notifications: ${error.message}`);
    }
}
