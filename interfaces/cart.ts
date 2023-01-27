import { ISize, IGender } from './Products';

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: IGender;
  quantity: number;
}

export interface IOrderSummary {
  totalProducts: number;
  subTotal: number;
  taxRate: number;
  total: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zipCode: string;
  city: string;
  phone: string;
  country: string;
}
