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
