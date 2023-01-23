import { createContext } from 'react';
import { ICartProduct, IOrderSummary } from '../../interfaces/cart';

interface ContextProps {
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  //Methods
  addProduct: (product: ICartProduct) => void;
  updateProductCart: (product: ICartProduct) => void;
  updateProductCartQuantity: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
