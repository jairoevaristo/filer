import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { IUserRepository } from '../interfaces/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUserDTO): Promise<User> {
    const { email, name, password, avatar_url } = createUser;

    const user = await this.prisma.user.create({
      data: {
        email,
        avatar: avatar_url,
        name,
        password,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        name: true,
        socketId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findAll(
    emails: string[],
    search: string,
    userId: string,
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        AND: {
          email: {
            notIn: emails,
          },
          id: {
            not: userId,
          },
        },
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        socketId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
  async update(userId: string, updateUser: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUser,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateSocketId(userId: string, socketId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        socketId,
      },
    });
  }
}
