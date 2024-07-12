import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { INotificationRepository } from '../interfaces/notification';
import { CreateNotification } from '../entities/create-notification';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { Notification } from '../entities/notification';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateNotificationDTO): Promise<CreateNotification> {
    const { shareId, userId, userToSharedId } = data;

    const notification = await this.prisma.notification.create({
      data: {
        userToSharedId,
        users: {
          connect: {
            id: userId,
          },
        },
        shares: {
          connect: {
            id: shareId,
          },
        },
      },
    });

    return notification;
  }

  async findAll(userToSharedId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userToSharedId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        isMarkView: true,
        id: true,
        createdAt: true,
        users: {
          select: {
            avatar: true,
            name: true,
            email: true,
            id: true,
          },
        },
        shares: {
          select: {
            createdAt: true,
            id: true,
          },
        },
      },
    });

    return notifications;
  }

  async markNotificationAsView(id: string): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        isMarkView: true,
      },
    });
  }
}
