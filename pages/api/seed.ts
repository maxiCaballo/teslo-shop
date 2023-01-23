import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { Product, User } from '../../models';

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

  //Products
  await Product.deleteMany();
  await Product.insertMany(seedData.initialData.products);
  //Users
  await User.deleteMany();
  await User.insertMany(seedData.initialData.users);

  await db.disconnect();

  res.status(200).json({ message: 'Products populate in DB successfully' });
}
