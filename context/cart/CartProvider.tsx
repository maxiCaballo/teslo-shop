import { FC, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces/cart';
import Cookie from 'js-cookie';

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

  const addProduct = (product: ICartProduct) => {
    dispatch({ type: 'Add', payload: product });
  };
  const updateProductsCart = (product: ICartProduct) => {
    dispatch({ type: 'Update', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //Methods
        addProduct,
        updateProductsCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
