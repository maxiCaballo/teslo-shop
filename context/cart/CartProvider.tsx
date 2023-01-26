import { FC, useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct, IOrderSummary } from '../../interfaces/cart';
import Cookie from 'js-cookie';

//Interfaces
export interface CartState {
  isLoaded: boolean; // Esta prop es para leer de la Cookie el carrito, puede ser un proceso asincrono por eso va en una prop.
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
}

type Props = {
  children: React.ReactElement;
};

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  orderSummary: {
    totalProducts: 0,
    subTotal: 0,
    taxRate: 0,
    total: 0
  }
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  //Leer cookie y actualizar estado
  //Va en un try catch por si el usuario manipula el localStorage
  useEffect(() => {
    try {
      const cartFromlocalStorage = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!) //el ! es para indicarle que siempre voy a recibir un string
        : [];
      dispatch({
        type: 'Read and set cart from cookie',
        payload: cartFromlocalStorage
      });
    } catch (error) {
      dispatch({
        type: 'Read and set cart from cookie',
        payload: []
      });
    }
  }, []);

  //Setear cookie cada vez que haya un cambio en el estado
  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  //Actualizar montos de la orden
  useEffect(() => {
    //Cantidad de productos
    //Subtotal
    //Impuestos + 15%
    //Total

    const totalProducts = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const subTotal = state.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const OrderSummary: IOrderSummary = {
      totalProducts,
      subTotal,
      taxRate: subTotal * taxRate,
      total: Number((subTotal * (taxRate + 1)).toFixed(2))
    };
    dispatch({ type: 'UpdateOrderSummary', payload: OrderSummary });
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
  const removeProductCart = (product: ICartProduct) => {
    dispatch({ type: 'Remove', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        //Methods
        addProduct,
        updateProductCart,
        updateProductCartQuantity,
        removeProductCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
