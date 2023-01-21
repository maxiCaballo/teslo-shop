import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps {
  cart: ICartProduct[];
  //Methods
  addProduct: (payload: ICartProduct) => void;
  updateProductsCart: (payload: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
