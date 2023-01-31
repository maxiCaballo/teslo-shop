import { createContext } from 'react';
import { ICartProduct, IOrderSummary, IShippingAddress } from '../../interfaces';
import { OrderResponse } from './CartProvider';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  shippingAddress?: IShippingAddress;
  //Methods
  //Cart
  addProduct: (product: ICartProduct) => void;
  updateProductCart: (product: ICartProduct) => void;
  updateProductCartQuantity: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
  //Shipping address
  updateAddress: (address: IShippingAddress) => void;
  //Order
  createOrder: () => Promise<OrderResponse>;
}

export const CartContext = createContext({} as ContextProps);
