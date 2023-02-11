import { IUser } from './User';
import { ISize } from './Products';

export interface IOrder {
  _id?           : string;
  user?          : IUser | string; // El IUser es para poder hacer un populate y traer toda la info del user, el objeto completo
  orderItems     : IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod? : string;
  orderSummary   : IOrderSummary;
  isPaid         : boolean;
  paidAt?        : string;
  transactionId? : string
}

export interface IOrderItem {
  _id     : string;
  title   : string;
  size    : ISize;
  quantity: number;
  slug    : string;
  images  : string[];
  gender  : string;
  price   : number; //Para guardar el precio en el momento de la compra, porque en un futuro podría subir
}
export interface IShippingAddress {
  firstName: string;
  lastName : string;
  address  : string;
  address2 : string;
  zipCode  : string;
  city     : string;
  phone    : string;
  country  : string;
}
export interface IOrderSummary {
  totalProducts: number;
  subTotal     : number;
  taxRate      : number;
  total        : number;
}
