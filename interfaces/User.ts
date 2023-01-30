export interface IUser {
  _id       : string;
  name      : string;
  email     : string;
  password? : string;
  role      : IRole;
  createdAt?: string;
  updatedAt?: string;
}
export interface ILoggedUser {
  _id? : string; //Para poder usar el usuario que viene de nextAuth...
  token: string;
  name : string;
  email: string;
  role : IRole;
}

//Esta interfaz la uso solo en el [...nextauth].ts para que no me de error de id
export interface IUserNextAuth {
  _id   : string;
  token?: string;
  name  : string;
  email : string;
  role  : IRole;
}

export type IRole = 'client' | 'admin';
