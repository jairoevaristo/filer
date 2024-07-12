import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateSharedDTO } from '../dtos/create-shared.dto';
import { ISharedRepository } from '../interfaces/shared';
import {
  ShareFileWithMe,
  Shared,
  SharedFileList,
} from '../entities/shared.entity';

@Injectable()
export class SharedRepository implements ISharedRepository {
  constructor(private prisma: PrismaService) {}

  async create(shared: CreateSharedDTO, userId: string): Promise<Shared> {
    const { fileId, permission, sharedToUsersId, public_share } = shared;

    const sharedFile = await this.prisma.share.create({
      data: {
        sharedToUsersIds: {
          connect: sharedToUsersId.map((id) => ({ id })),
        },
        permission,
        public_share,
        userId,
        fileId,
      },
    });

    return sharedFile as Shared;
  }

  async findAll(id: string): Promise<SharedFileList[]> {
    const shares = await this.prisma.share.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: id,
      },
      select: {
        createdAt: true,
        id: true,
        permission: true,
        sharedToUsersIds: {
          select: {
            id: true,
            avatar: true,
            email: true,
            name: true,
          },
        },
        file: {
          select: {
            id: true,
            mimetype: true,
            name: true,
            createdAt: true,
            size: true,
            url: true,
          },
        },
      },
    });

    return shares as SharedFileList[];
  }

  async findById(id: string): Promise<SharedFileList> {
    const shared = await this.prisma.share.findUnique({
      where: { id },
      select: {
        createdAt: true,
        id: true,
        permission: true,
        sharedToUsersIds: {
          select: {
            id: true,
            avatar: true,
            email: true,
            name: true,
          },
        },
        file: {
          select: {
            id: true,
            mimetype: true,
            name: true,
            createdAt: true,
            size: true,
            url: true,
          },
        },
      },
    });

    return shared as SharedFileList;
  }

  async findByIdPermissionUser(id: string, userId: string) {
    const shared = await this.prisma.share.findUnique({
      where: {
        id,
        AND: [
          {
            OR: [
              {
                sharedToUsersIds: {
                  some: {
                    id: userId,
                  },
                },
              },
              {
                public_share: {
                  equals: true,
                },
              },
            ],
          },
        ],
      },
      select: {
        createdAt: true,
        id: true,
        permission: true,
        public_share: true,
        file: {
          select: {
            id: true,
            mimetype: true,
            createdAt: true,
            size: true,
            name: true,
            url: true,
          },
        },
      },
    });

    if (shared?.public_share) {
      return shared;
    }

    if (!shared) {
      return null;
    }

    return shared;
  }

  async findAllShareWithMe(userId: string): Promise<ShareFileWithMe[]> {
    const shares = await this.prisma.share.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        sharedToUsersIds: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        permission: true,
        createdAt: true,
        userId: true,
        file: {
          select: {
            id: true,
            mimetype: true,
            name: true,
            createdAt: true,
            size: true,
            url: true,
            user: {
              select: {
                id: true,
                avatar: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return shares as ShareFileWithMe[];
  }

  async deleteShare(id: string): Promise<void> {
    await this.prisma.share.delete({
      where: {
        id,
      },
    });
  }
}
