import { createContext } from 'react';
import { ILoggedUser } from '../../interfaces/User';
import { Response } from './AuthProvider';

interface ContextProps {
  isLogged: boolean;
  user?: ILoggedUser;
  //Methods
  login: (email: string, password: string) => Promise<Response>;
  logout: () => void;
  userRegister: (name: string, email: string, password: string) => Promise<Response>;
}

export const AuthContext = createContext({} as ContextProps);
