import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | { type: 'Load cart from cookies or localstorage'; payload: ICartProduct[] }
  | { type: 'Add'; payload: ICartProduct }
  | { type: 'Remove' };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Add':

    case 'Remove':

    default:
      return state;
  }
};
