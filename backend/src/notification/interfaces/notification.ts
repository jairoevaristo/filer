import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { CreateNotification } from '../entities/create-notification';
import { Notification } from '../entities/notification';

export interface INotificationRepository {
  create(data: CreateNotificationDTO): Promise<CreateNotification>;
  findAll(userId: string): Promise<Notification[]>;
  markNotificationAsView(id: string): Promise<void>;
}
