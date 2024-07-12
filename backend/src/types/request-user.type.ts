export interface RequestUser {
  user: {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
}
