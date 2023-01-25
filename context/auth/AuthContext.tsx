import { createContext } from 'react';
import { ILoggedUser } from '../../interfaces/User';

interface ContextProps {
  isLogged: boolean;
  user?: ILoggedUser;
}

export const AuthContext = createContext({} as ContextProps);
