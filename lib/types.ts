export interface UserType {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageType {
  id: string;
  userId: string;
  prompt: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: Partial<UserType>;
}
