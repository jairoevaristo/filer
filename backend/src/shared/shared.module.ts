import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { UserRepository } from 'src/user/repositories/user.repository';

import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { SharedRepository } from './repositories/shared.repository';
import { NotificationModule } from 'src/notification/notication.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [SharedController],
  providers: [
    SharedService,
    SharedRepository,
    WebsocketGateway,
    UserRepository,
  ],
})
export class SharedModule {}
