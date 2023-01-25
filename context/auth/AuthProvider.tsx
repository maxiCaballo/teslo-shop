import { FC, useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { ILoggedUser } from '../../interfaces/User';

export interface AuthState {
  isLogged: boolean;
  user?: ILoggedUser;
}

type Props = {
  children: React.ReactElement;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  return <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>;
};
