export type Shared = {
    id: string;
    fileId: string;
    userId: string;
    sharedToUsersId: string[];
    permission: Permission;
    createdAt: Date;
    public: boolean;
    updatedAt: Date;
    downloadAt: Date;
  }

  export type SharedFileList = {
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

  export type ShareFileWithMe = {
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
  
  export type Permission = 'VIEWER' | 'EDITOR'