import { ICartProduct, IOrderSummary } from '../../interfaces/cart';
import { CartState } from './CartProvider';

type CartActionType =
  //Cart
  | { type: 'Load cart from cookies or localstorage'; payload: ICartProduct[] }
  | { type: 'Add'; payload: ICartProduct }
  | { type: 'Update'; payload: ICartProduct }
  | { type: 'UpdateQuantity'; payload: ICartProduct }
  | { type: 'Read and set cart from cookie'; payload: ICartProduct[] }
  | { type: 'Remove'; payload: ICartProduct }
  //Order summary
  | { type: 'UpdateOrderSummary'; payload: IOrderSummary };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    //Cart
    case 'Add':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'Update':
      //Busco en el carrito el indice del elemento que me pasan en el payload por talle.
      const index = state.cart.findIndex(
        ({ size }) => action.payload.size === size
      );
      //Me genero una copia del estado.
      const stateCartCopy = { ...state };
      //Borro el producto que estaba antes y agrego el nuevo actualizado en la misma posicion.
      stateCartCopy.cart.splice(index, 1, action.payload);
      return {
        ...state,
        cart: [...stateCartCopy.cart],
      };
    case 'UpdateQuantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (
            product._id !== action.payload._id ||
            product.size !== action.payload.size
          )
            return product;
          //Retorno el objeto actualizado
          return action.payload;
        }),
      };
    case 'Read and set cart from cookie':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Remove':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (
            product._id !== action.payload._id ||
            product.size !== action.payload.size
          )
            return product;
        }),
      };
    //Order summary
    case 'UpdateOrderSummary':
      return {
        ...state,
        orderSummary: { ...action.payload },
      };

    default:
      return state;
  }
};
