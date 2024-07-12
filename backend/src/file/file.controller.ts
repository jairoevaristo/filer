import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseInterceptors,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RequestUser } from 'src/types/request-user.type';

import { FileService } from './file.service';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() request: RequestUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { sub } = request.user;
    return this.fileService.create(file, sub);
  }

  @Get()
  findAll(@Request() request: RequestUser) {
    const { sub } = request.user;
    return this.fileService.findAll(sub);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.fileService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.fileService.delete(id);
  }
}
