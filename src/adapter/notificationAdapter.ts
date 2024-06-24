// src/controllers/notificationController.ts

import { Request, Response } from 'express';
import { NotificationService } from '../useCase/interface/services/INotification';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  async sendNotification(req: Request, res: Response) {
    const { recipients, title, body } = req.body;

    try {
      await this.notificationService.sendNotification(recipients, title, body);
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  }
}
