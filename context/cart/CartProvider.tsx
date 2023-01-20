import { FC, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces/cart';

type Props = {
  children: React.ReactElement;
};

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProduct = (payload: ICartProduct) => {
    dispatch({ type: 'Add', payload });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //Methods
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
