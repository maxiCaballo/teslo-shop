import { createContext } from 'react';
import { ICartProduct, IOrderSummary, IShippingAddress } from '../../interfaces/cart';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  shippingAddress?: IShippingAddress;
  //Methods
  addProduct: (product: ICartProduct) => void;
  updateProductCart: (product: ICartProduct) => void;
  updateProductCartQuantity: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
