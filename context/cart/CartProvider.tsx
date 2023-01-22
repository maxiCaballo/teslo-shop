import { FC, useEffect, useReducer } from 'react';
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

  //Va en un try catch por si el usuario manipula la localStorage
  useEffect(() => {
    localStorage.getItem('cart') ? console.log('hola') : console.log('no');
    const cartFromlocalStorage = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!) //el ! es para indicarle que siempre voy a recibir un string
      : [];

    dispatch({
      type: 'Read and set cart from cookie',
      payload: cartFromlocalStorage,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  //*Methods
  const addProduct = (product: ICartProduct) => {
    dispatch({ type: 'Add', payload: product });
  };
  const updateProductCart = (product: ICartProduct) => {
    dispatch({ type: 'Update', payload: product });
  };

  const updateProductCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'UpdateQuantity', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //Methods
        addProduct,
        updateProductCart,
        updateProductCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
