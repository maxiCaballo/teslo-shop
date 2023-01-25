import { FC, useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { ILoggedUser } from '../../interfaces/User';
import axios from 'axios';
import { teslo_Api } from '@/api';
import Cookies from 'js-cookie';

export interface AuthState {
  isLogged: boolean;
  user?: ILoggedUser;
}

type Props = {
  children: React.ReactElement;
};

export type Response = {
  ok: boolean;
  errorMessage?: string;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  //*Methods
  const login = async (email: string, password: string): Promise<Response> => {
    try {
      const { data } = await teslo_Api.post('/user/login', { email, password });
      const { user } = data;

      Cookies.set('token', user.token);
      dispatch({ type: 'Login', payload: user });
      return {
        ok: true
      };
    } catch (error) {
      let errorMessage = 'Error';
      if (axios.isAxiosError(error)) errorMessage = error.response?.data.message;

      return {
        ok: false,
        errorMessage
      };
    }
  };
  const userRegister = async (name: string, email: string, password: string): Promise<Response> => {
    try {
      const { data } = await teslo_Api.post('/user/register', { name, email, password });
      const { newUser } = data;

      Cookies.set('token', newUser.token);
      dispatch({ type: 'Login', payload: newUser });
      return {
        ok: true
      };
    } catch (error) {
      let errorMessage = 'Error';
      if (axios.isAxiosError(error)) errorMessage = error.response?.data.message;

      return {
        ok: false,
        errorMessage
      };
    }
  };

  return <AuthContext.Provider value={{ ...state, login, userRegister }}>{children}</AuthContext.Provider>;
};
