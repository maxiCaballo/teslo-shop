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
export const getAllProductsWithSlug = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByQuery = async (
  query: string
): Promise<IProduct[] | []> => {
  await db.connect();
  const products = await Product.find({
    $text: { $search: query },
  })
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  //No es necesario porque si no encuentra nada retorna un array vacío
  // if(products.length === 0) return []

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await Product.find()
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  return products;
};
