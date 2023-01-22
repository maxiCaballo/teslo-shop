import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | { type: 'Load cart from cookies or localstorage'; payload: ICartProduct[] }
  | { type: 'Add'; payload: ICartProduct }
  | { type: 'Update'; payload: ICartProduct }
  | { type: 'UpdateQuantity'; payload: ICartProduct }
  | { type: 'Read and set cart from cookie'; payload: ICartProduct[] }
  | { type: 'Remove' };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
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
      console.log('1', action.payload);
      console.log('2', state.cart);

      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Remove':
    default:
      return state;
  }
};
