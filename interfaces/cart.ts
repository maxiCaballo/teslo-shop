import { ISize, IGender } from './Products';

export interface ICartProduct {
  _id     : string;
  images  : string;
  price   : number;
  slug    : string;
  title   : string;
  quantity: number;
  size?   : ISize;
  gender  : IGender;
}
