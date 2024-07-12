import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { User } from '../entities/user';

export interface IUserRepository {
  create(createUser: CreateUserDTO): Promise<User>;
  findById(userId: string): Promise<User>;
  findAll(emails: string[], search: string, userId: string): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  update(userId: string, updateUser: UpdateUserDTO): Promise<User>;
  delete(userId: string): Promise<void>;
  updateSocketId(userId: string, socketId: string): Promise<void>;
}
