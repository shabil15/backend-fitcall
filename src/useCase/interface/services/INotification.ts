

export interface NotificationService {
    sendNotification(recipients: string[], title: string, body: string): Promise<void>;
  }
  