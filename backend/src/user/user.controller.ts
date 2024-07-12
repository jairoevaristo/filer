import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from 'src/validations/validation.pipe';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RequestUser } from 'src/types/request-user.type';

import { UserService } from './user.service';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) createUser: CreateUserDTO) {
    try {
      const user = await this.userService.create(createUser);
      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @Get('all-users')
  async allUsers(
    @Request() request: RequestUser,
    @Query('emails') emails: string,
    @Query('search') search: string,
  ) {
    const { sub } = request.user;

    try {
      const excludedEmails = Array.isArray(emails) ? emails : [emails];
      const users = await this.userService.findAllUsers(
        excludedEmails,
        search,
        sub,
      );
      return users;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() request: RequestUser) {
    const { sub } = request.user;

    try {
      const user = await this.userService.findById(sub);
      return user;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(
    @Request() request: RequestUser,
    @Body(new ValidationPipe()) updateUser: UpdateUserDTO,
  ) {
    const { sub } = request.user;
    try {
      const user = await this.userService.update(sub, updateUser);
      return user;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Request() request: RequestUser) {
    const { sub } = request.user;
    try {
      await this.userService.delete(sub);
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }
}
