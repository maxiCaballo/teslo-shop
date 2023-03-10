import { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { Product } from '@/models';

type Data = { message: string } | { price: number };

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductPrice(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

async function getProductPrice(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id = '' } = req.query;

  if (!isValidObjectId(id)) return res.status(404).json({ message: 'MongoId error' });

  try {
    await db.connect();
    const price = await Product.findById(id).select('price').lean();
    await db.disconnect();

    if (!price) return res.status(404).json({ message: 'There is no price to show' });

    return res.status(200).json(price);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: 'There was an error with the request' });
  }
}
