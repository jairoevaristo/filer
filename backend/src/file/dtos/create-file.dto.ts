import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateFileDTO {
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Field size cannot be empty' })
  size: number;

  @IsNotEmpty({ message: 'Field userId cannot be empty' })
  userId: string;

  @IsNotEmpty({ message: 'Field mimetype cannot be empty' })
  mimetype: string;

  @IsNotEmpty({ message: 'Field url cannot be empty' })
  @IsUrl()
  url: string;

  @IsNotEmpty({ message: 'Field url cannot be empty' })
  supabasePath: string;
}
