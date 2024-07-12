import { Permission } from './permission.entity';

export interface Shared {
  id: string;
  fileId: string;
  userId: string;
  public_share: boolean;
  sharedToUsersIds: string[];
  permission: Permission;
  createdAt: Date;
  updatedAt: Date;
  downloadAt: Date;
}

export interface SharedFileList {
  id: string;
  permission: Permission;
  createdAt: Date;
  sharedToUsersIds: Array<{
    id: string;
    email: string;
    name: string;
    avatar: string;
  }>;
  file: {
    id: string;
    createdAt: Date;
    name: string;
    url: string;
    mimetype: string;
    size: number;
  };
}

export interface ShareFileWithMe {
  id: string;
  permission: Permission;
  createdAt: Date;
  userId: string;
  file: {
    id: string;
    createdAt: Date;
    name: string;
    url: string;
    mimetype: string;
    size: number;
    user: {
      id: string;
      avatar: string;
      email: string;
      name: string;
    };
  };
}
