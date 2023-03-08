import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/models';
import { db } from '@/database';
import { IProduct } from '../../../interfaces/Products';

type Data = { message: string } | IProduct | IProduct[];

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  //TODO: actualizar las img

  if (!products) return res.status(400).json({ message: 'There was an error with the request' });

  return res.status(200).json(products);
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
