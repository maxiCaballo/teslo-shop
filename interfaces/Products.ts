//La interfaz lleva todas las propiedades que van a estar en la bd de mongo
export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: ITypes;
  gender: IGender;
  createdAt: string;
  updatedAt: string;
}

export type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ITypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type IGender = 'men' | 'women' | 'kid' | 'unisex';
