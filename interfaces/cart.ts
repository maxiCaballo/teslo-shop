import { ISize, IGender } from './Products';

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  size: ISize;
  slug: string;
  title: string;
  gender: IGender;
  quantity: number;
}
