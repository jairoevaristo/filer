import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { NotificationRepository } from './repositories/notification.repository';
import { CreateNotificationDTO } from './dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async createNotification(data: CreateNotificationDTO) {
    try {
      const notification = await this.notificationRepository.create(data);
      return notification;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllNotification(userId: string) {
    try {
      const notifications = await this.notificationRepository.findAll(userId);
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
