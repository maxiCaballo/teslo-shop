import { db } from './';
import { Product } from '../models';
import { IProduct } from '@/interfaces';

//Esta se usa en el SSR porque es cada vez que se accede a la page product
export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};

type ProductSlug = {
  slug: string;
};
// Esta se usa en SSG porque precisa de todos los productos para generar
// cada una de las páginas estaticas
export const getAllProductsBySlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
};
