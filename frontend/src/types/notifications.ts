export type Notification = {
    id: string;
    createdAt: Date;
    isMarkView: boolean;
    shares: {
      id: string;
      createdAt: Date;
    };
    users: {
      id: string;
      email: string;
      name: string;
      avatar: string;
    };
  }
  