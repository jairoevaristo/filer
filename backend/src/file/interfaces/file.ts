import { CreateFileDTO } from '../dtos/create-file.dto';
import { File } from '../entities/file';
import { FileDetail } from '../entities/file-detail';

export interface IFileRepository {
  create(file: CreateFileDTO): Promise<File>;
  findById(id: string): Promise<FileDetail>;
  countFilesRepeat(): Promise<number>;
  delete(id: string): Promise<void>;
  findAll(userId: string): Promise<File[]>;
}
