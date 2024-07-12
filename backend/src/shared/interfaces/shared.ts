import { CreateSharedDTO } from '../dtos/create-shared.dto';
import {
  ShareFileWithMe,
  Shared,
  SharedFileList,
} from '../entities/shared.entity';

export interface ISharedRepository {
  create(data: CreateSharedDTO, userId: string): Promise<Shared>;
  findById(id: string): Promise<SharedFileList>;
  findAll(id: string): Promise<SharedFileList[]>;
  findAllShareWithMe(userId: string): Promise<ShareFileWithMe[]>;
  deleteShare(id: string): Promise<void>;
}
