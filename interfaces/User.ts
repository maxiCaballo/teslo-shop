export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: IRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoggedUser {
  token: string;
  name: string;
  email: string;
  role: IRole;
}

export type IRole = 'client' | 'admin';
