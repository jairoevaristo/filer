import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { SharedModule } from './shared/shared.module';
import { SupabaseModule } from './supabase/supabase.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { UserRepository } from './user/repositories/user.repository';
import { NotificationModule } from './notification/notication.module';
import { NotificationRepository } from './notification/repositories/notification.repository';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    FileModule,
    SharedModule,
    SupabaseModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [WebsocketGateway, UserRepository, NotificationRepository],
})
export class AppModule {}
