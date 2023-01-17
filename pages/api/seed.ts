import type { NextApiRequest, NextApiResponse } from 'next';
import { db, productSeed } from '../../database';
import { Product } from '../../models';

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: `you don't have access to this service`,
    });
  }

  await db.connect();

  await Product.deleteMany();
  await Product.insertMany(productSeed.initialData.products);

  await db.disconnect();

  res.status(200).json({ message: 'Products populate in DB successfully' });
}
