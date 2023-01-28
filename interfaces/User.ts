export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: IRole;
  createdAt?: string;
  updatedAt?: string;
}
export interface ILoggedUserNextAuth {
  _id: string;
  name: string;
  token: string;
  email: string;
  role: IRole;
}

export interface ILoggedUser {
  token: string;
  name: string;
  email: string;
  role: IRole;
}

export type IRole = 'client' | 'admin';
