import { IsNotEmpty } from 'class-validator';

import { Permission } from '../entities/permission.entity';

export class CreateSharedDTO {
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  fileId: string;

  @IsNotEmpty({ message: 'Field name cannot be empty' })
  sharedToUsersId: string[];

  @IsNotEmpty({ message: 'Field name cannot be empty' })
  permission: Permission;

  public_share?: boolean;
}
