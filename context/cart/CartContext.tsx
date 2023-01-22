import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps {
  cart: ICartProduct[];
  //Methods
  addProduct: (payload: ICartProduct) => void;
  updateProductCart: (payload: ICartProduct) => void;
  updateProductCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
