import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces/Products';
import { SHOP_CONSTANTS } from '../../../database/constants';

type Data = { message: string } | IProduct[] | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    default:
      return res.status(400).json({ message: 'HTTP method error' });
  }
}

//GET
export const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { gender = 'all' } = req.query;

  let condition = {};

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`))
    condition = { gender };

  try {
    await await db.connect();
    const products = await Product.find(condition)
      //Me selecciona solo esos campos menos el id que lleva un - porque lo está restando
      .select('images inStock price slug title -_id')
      .lean();
    await await db.disconnect();

    if (!products)
      return res.status(400).json({ message: 'There are no products' });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'There was an error with the request' });
  }
};
