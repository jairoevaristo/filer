import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { UsersController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
