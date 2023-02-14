import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { ILoggedUser, IUserNextAuth } from '../../interfaces/User';
import { teslo_Api } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
  isLogged: boolean;
  user?: ILoggedUser;
}

export type Response = {
  ok: boolean;
  errorMessage?: string;
  user?: ILoggedUser;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
};

type Props = {
  children: React.ReactElement;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession(); //next-auth
  // const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && data.user) {
      dispatch({ type: 'Login', payload: data.user as ILoggedUser });
    }
  }, [status, data]);

  //Chequeo del token generado por nosotros y si es valido guardo el usuario en el estado...
  // useEffect(() => {
  //   checkToken();
  // }, []);

  //*Methods
  //Éste metodo lo uso para el login personalizado
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
    // Cookies.remove('token');
    Cookies.remove('cart');

    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zipCode');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut();

    // router.reload();

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
  //*Metodo para login personalizado
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
