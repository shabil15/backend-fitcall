import { Schema, Document, model } from 'mongoose';

export interface NotificationDocument extends Document {
    title: string;
    message: string;
    userId: Schema.Types.ObjectId;
    createdAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>({
    title: {
        type: String,
        required: true,
        trim: true // Ensure no leading/trailing whitespace
    },
    message: {
        type: String,
        required: true,
        trim: true // Ensure no leading/trailing whitespace
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = model<NotificationDocument>('Notification', notificationSchema);
export default Notification;
