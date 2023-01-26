import { FC, useReducer, useEffect } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { ILoggedUser } from '../../interfaces/User';
import axios from 'axios';
import { teslo_Api } from '@/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

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
  user?: ILoggedUser;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

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
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('cart');

    router.reload();

    // ? No es necesario hacer el dispatch ya que al borrar de las cookies el token y el cart
    // ? cuando carga la aplicacion va a cargar con el token vacío y por ende no se va a cargar en el estado
    //dispatch({ type: 'Logout' });
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
  const checkToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      //Axios envía la cookie de manera automatica, si fuera fetch habría que especificarle que la quiero enviar.
      const { data } = await teslo_Api.get('/user/validate-token');
      const { user } = data;

      dispatch({ type: 'Login', payload: user });
      Cookies.set('token', user.token);
    } catch (error) {
      Cookies.remove('token');
    }
  };

  return <AuthContext.Provider value={{ ...state, login, logout, userRegister }}>{children}</AuthContext.Provider>;
};
