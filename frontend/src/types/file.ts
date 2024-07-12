export type File = {
  id: string;
  name: string;
  url: string;
  mimetype: string;
  size: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FileUpload = {
  image_url: string;
  name: string;
  size: number;
  progress: number;
  mimetype: string;
}

export type FileDetail = {
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