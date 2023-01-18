import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';

import { db } from '@/database';
import { IProduct } from '../../../interfaces/Products';

type Data = { message: string } | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: 'HTTP method error' });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;

  try {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product)
      return res
        .status(404)
        .json({ message: 'There is no product with this slug' });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'There was an error' });
  }
};
