import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { NotificationService } from 'src/notification/notification.service';

import { CreateSharedDTO } from './dtos/create-shared.dto';
import { UpdateSharedDTO } from './dtos/update-shared.dto';
import { SharedRepository } from './repositories/shared.repository';
import { limit } from 'src/libs/limit';

@Injectable()
export class SharedService {
  constructor(
    private sharedRepository: SharedRepository,
    private notificationService: NotificationService,
    private websocket: WebsocketGateway,
  ) {}

  async create(createShared: CreateSharedDTO, userId: string) {
    const { sharedToUsersId } = createShared;

    try {
      const shared = await this.sharedRepository.create(createShared, userId);
      const creatManyNotification = sharedToUsersId.map((userToSharedId) =>
        limit(() =>
          this.notificationService.createNotification({
            shareId: shared.id,
            userId,
            userToSharedId,
          }),
        ),
      );

      const sendNotification = createShared.sharedToUsersId.map((userId) =>
        limit(() => this.websocket.sendMessage(userId, null)),
      );

      Promise.all([sendNotification, creatManyNotification]);
      return shared;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findByIdPermissionUser(sharedId: string, userId: string) {
    try {
      const shared = await this.sharedRepository.findByIdPermissionUser(
        sharedId,
        userId,
      );

      if (!shared) {
        return new UnauthorizedException(
          'You do not have permission to access this file',
        );
      }

      return shared;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findAll(userId: string) {
    try {
      const shared = await this.sharedRepository.findAll(userId);
      return shared;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findAllShareWithMe(userId: string) {
    try {
      const shared = await this.sharedRepository.findAllShareWithMe(userId);
      return shared;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const shared = await this.sharedRepository.findById(id);
      return shared;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  update(id: number, updateSharedDto: UpdateSharedDTO) {
    return `This action updates a #${id} shared`;
  }

  async delete(id: string) {
    try {
      await this.sharedRepository.deleteShare(id);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
