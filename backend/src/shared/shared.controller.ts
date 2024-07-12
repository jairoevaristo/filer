import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ValidationPipe } from 'src/validations/validation.pipe';
import { RequestUser } from 'src/types/request-user.type';

import { SharedService } from './shared.service';
import { CreateSharedDTO } from './dtos/create-shared.dto';
import { UpdateSharedDTO } from './dtos/update-shared.dto';

@UseGuards(AuthGuard)
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Post('create')
  async create(
    @Request() request: RequestUser,
    @Body(new ValidationPipe()) createShared: CreateSharedDTO,
  ) {
    const { sub: userId } = request.user;

    try {
      const shared = await this.sharedService.create(createShared, userId);
      return shared;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @Get('permission/:id')
  async findByIdPermissionUser(
    @Param('id') id: string,
    @Request() request: RequestUser,
  ) {
    const { sub: userId } = request.user;

    try {
      const shared = await this.sharedService.findByIdPermissionUser(
        id,
        userId,
      );
      return shared;
    } catch (error) {
      return new HttpException(error.status, error.message);
    }
  }

  @Get('list-my-shared')
  async findAll(@Request() request: RequestUser) {
    const { sub } = request.user;

    try {
      const shares = await this.sharedService.findAll(sub);
      return shares;
    } catch (error) {
      return new HttpException(error.status, error.message);
    }
  }

  @Get('list-share-with-me')
  async findAllSharedWithMe(@Request() request: RequestUser) {
    const { sub } = request.user;

    try {
      const shares = await this.sharedService.findAllShareWithMe(sub);
      return shares;
    } catch (error) {
      return new HttpException(error.status, error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const shares = await this.sharedService.findOne(id);
      return shares;
    } catch (error) {
      return new HttpException(error.status, error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedDto: UpdateSharedDTO) {
    return this.sharedService.update(+id, updateSharedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedService.delete(id);
  }
}
