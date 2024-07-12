import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { SupabaseService } from 'src/supabase/supabase.service';
import { formatFileName } from 'src/utils/file';
import { encryptFile } from 'src/utils/encrypt';
import { deleteLocalFile } from 'src/utils/delete-file';

import { FileRepository } from './repositories/file.repository';

@Injectable()
export class FileService {
  constructor(
    private fileRepository: FileRepository,
    private supabaseService: SupabaseService,
  ) {}

  async create(file: Express.Multer.File, userId: string) {
    try {
      const { size, originalname, mimetype } = file;
      const { extensionFile, formatOriginalName } =
        formatFileName(originalname);

      const { publicUrl, fullPath } = await this.supabaseService.upload(
        file,
        userId,
      );

      await deleteLocalFile(file.path);

      const countFilesWithRepeatName =
        await this.fileRepository.countFilesRepeat();

      const nameFile =
        countFilesWithRepeatName > 0
          ? `${formatOriginalName} (${countFilesWithRepeatName}).${extensionFile}`
          : originalname;

      const { encryptedMimeType, encryptedName, encryptedUrl } = encryptFile({
        mimetype,
        name: nameFile,
        url: publicUrl,
      });

      const newFile = await this.fileRepository.create({
        name: encryptedName,
        supabasePath: fullPath,
        size,
        userId,
        url: encryptedUrl,
        mimetype: encryptedMimeType,
      });

      return newFile;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findAll(userId: string) {
    try {
      const files = await this.fileRepository.findAll(userId);
      return files;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findById(id: string) {
    try {
      const file = await this.fileRepository.findById(id);
      return file;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    try {
      const file = await this.fileRepository.findById(id);

      await this.fileRepository.delete(id);
      await this.supabaseService.delete(file.supabasePath);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
