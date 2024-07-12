export interface FileDetail {
  mimetype: string;
  name: string;
  size: number;
  userId: string;
  url: string;
  supabasePath: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    share: number;
  };
}
