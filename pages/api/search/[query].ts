import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '@/models';
import { db } from '@/database';
import { IProduct } from '../../../interfaces/Products';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProductsByTitleOrTags(req, res);

    default:
      return res.status(400).json({ message: 'HTTP method error' });
  }
}

const getProductsByTitleOrTags = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { query = '' } = req.query;

  if (query.length === 0)
    return res.status(400).json({ message: 'Must specify a search criteria ' });

  query = query.toString();

  try {
    //*Manera optima utilizando los indices de texto de mongoDb
    db.connect();
    const products = await Product.find({
      $text: { $search: query },
    })
      .select('title images price inStock slug -_id')
      .lean();
    db.disconnect();

    if (!products)
      return res
        .status(404)
        .json({ message: 'There are no product with this criteria' });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'There was an error' });
  }

  //*Así lo había hecho yo y funcionaba
  // db.connect();
  //   const products = await Product.find({
  //     $or: [
  //       { tags: { $in: query } },
  //       { title: { $regex: `${query}`, $options: 'i' } },
  //     ],
  //   }).lean();
  //db.disconnect();
};
