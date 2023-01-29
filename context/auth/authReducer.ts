import { AuthState } from './AuthProvider';
import { ILoggedUser, IUserNextAuth } from '../../interfaces/User';

type ActionType = { type: 'Login'; payload: ILoggedUser } | { type: 'Logout' };

export const authReducer = (state: AuthState, action: ActionType) => {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        isLogged: true,
        user: { ...action.payload }
      };

    case 'Logout':
      return {
        ...state,
        isLogged: false,
        user: undefined
      };

    default:
      return state;
  }
};
