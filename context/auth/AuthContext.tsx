import { createContext } from 'react';
import { ILoggedUser, IUserNextAuth } from '../../interfaces/User';
import { Response } from './AuthProvider';

interface ContextProps {
  isLogged: boolean;
  user?: ILoggedUser | IUserNextAuth; //la diferencia es que tiene _id el user de nextAuth y el loggedUser no
  //Methods
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
  userRegister: (name: string, email: string, password: string) => Promise<Response>;
}

export const AuthContext = createContext({} as ContextProps);
