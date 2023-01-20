import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | { type: 'Load cart from cookies or localstorage'; payload: ICartProduct[] }
  | { type: 'Add'; payload: ICartProduct }
  | { type: 'Update' }
  | { type: 'Remove' };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'Update':

    case 'Remove':

    default:
      return state;
  }
};
