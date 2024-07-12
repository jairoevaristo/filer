import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { IFileRepository } from '../interfaces/file';
import { CreateFileDTO } from '../dtos/create-file.dto';
import { File } from '../entities/file';
import { FileDetail } from '../entities/file-detail';

@Injectable()
export class FileRepository implements IFileRepository {
  constructor(private prisma: PrismaService) {}

  async create(file: CreateFileDTO): Promise<File> {
    const { mimetype, name, size, userId, url, supabasePath } = file;

    const saveFile = await this.prisma.file.create({
      data: {
        supabasePath,
        name,
        size,
        mimetype,
        url,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return saveFile;
  }

  async countFilesRepeat(): Promise<number> {
    const result: Array<{ count: number }> = await this.prisma.$queryRaw`
        SELECT COUNT(*) AS count FROM (
            SELECT regexp_replace(name, '\\s*\\(\\d+\\)', '') AS files_without_number -- remove '('number')' in filename
            FROM files
        ) AS subquery
    `;

    return result[0]?.count;
  }

  async findById(id: string): Promise<FileDetail> {
    const file = await this.prisma.file.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        url: true,
        mimetype: true,
        supabasePath: true,
        size: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            share: true,
          },
        },
      },
    });

    return file;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: {
        id,
      },
    });
  }

  async findAll(userId: string): Promise<File[]> {
    const file = await this.prisma.file.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
    });
    return file;
  }
}
