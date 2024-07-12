export interface File {
  id: string;
  name: string;
  url: string;
  mimetype: string;
  supabasePath: string;
  size: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
