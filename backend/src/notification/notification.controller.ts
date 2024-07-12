import {
  Controller,
  Get,
  HttpException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/guard/auth.guard';

import { NotificationService } from './notification.service';
import { RequestUser } from 'src/types/request-user.type';

@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('/list-notifications')
  async getNotification(@Request() request: RequestUser) {
    const { sub } = request.user;

    try {
      const notifications =
        await this.notificationService.findAllNotification(sub);
      return notifications;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }
}
