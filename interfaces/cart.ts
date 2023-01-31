import { ISize, IGender } from './Products';

export interface ICartProduct {
  _id     : string;
  title   : string;
  size?   : ISize;
  quantity: number;
  slug    : string;
  images  : string[];
  price   : number;
  gender  : IGender;
}
