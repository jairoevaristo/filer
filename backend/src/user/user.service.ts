import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from './repositories/user.repository';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUser: CreateUserDTO) {
    const { email, name, password, avatar_url } = createUser;
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      return new Error('User already exists with e-mail');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      avatar_url,
    });

    return user;
  }

  async findAllUsers(emails: string[], search: string, userId: string) {
    try {
      const users = await this.userRepository.findAll(emails, search, userId);
      return users;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      return new NotFoundException('User not found');
    }
  }

  async update(id: string, updateUser: UpdateUserDTO) {
    try {
      const user = await this.userRepository.update(id, updateUser);
      return user;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
