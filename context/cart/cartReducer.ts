import { ICartProduct, IOrderSummary, IShippingAddress } from '../../interfaces';
import { CartState } from './CartProvider';

type CartActionType =
  //Cart
  | { type: 'Add'; payload: ICartProduct }
  | { type: 'Update'; payload: ICartProduct }
  | { type: 'UpdateQuantity'; payload: ICartProduct }
  | { type: 'Read and set cart from cookie'; payload: ICartProduct[] }
  | { type: 'Remove'; payload: ICartProduct }
  | { type: 'ReloadCart' }
  //Shipping address
  | { type: 'UpdateAddress'; payload: IShippingAddress }
  | { type: 'LoadAddressFromCookies'; payload: IShippingAddress }
  //Order summary
  | { type: 'UpdateOrderSummary'; payload: IOrderSummary };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    //Cart
    case 'Add':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case 'Update':
      //Busco en el carrito el indice del elemento que me pasan en el payload por talle y id.
      const index = state.cart.findIndex(({ _id, size }) => action.payload.size === size && action.payload._id === _id);
      //Me genero una copia del estado.
      const stateCartCopy = [...state.cart];
      //Borro el producto que estaba antes y agrego el nuevo actualizado en la misma posicion.
      stateCartCopy.splice(index, 1, action.payload);
      return {
        ...state,
        cart: [...stateCartCopy]
      };
    case 'UpdateQuantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id || product.size !== action.payload.size) return product;
          //Retorno el objeto actualizado
          return action.payload;
        })
      };
    case 'Read and set cart from cookie':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload]
      };
    case 'Remove':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id !== action.payload._id || product.size !== action.payload.size) return product;
        })
      };
    case 'ReloadCart':
      return {
        ...state,
        cart: [],
        orderSummary: {
          totalProducts: 0,
          subTotal: 0,
          taxRate: 0,
          total: 0
        },
        shippingAddress: undefined
      };

    //Shipping address
    case 'UpdateAddress':
      return {
        ...state,
        shippingAddress: action.payload
      };
    case 'LoadAddressFromCookies':
      return {
        ...state,
        shippingAddress: action.payload
      };
    //Order summary
    case 'UpdateOrderSummary':
      return {
        ...state,
        orderSummary: { ...action.payload }
      };

    default:
      return state;
  }
};
