import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../models';
import { db } from '../../database';
import { IProduct } from '../../interfaces/Products';

type Data = { message: string } | IProduct[] | IProduct | null;

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
  const { gender, g } = req.query;

  if (!gender && !g) {
    try {
      await db.connect();
      const products = await Product.find()
        //Me selecciona solo esos campos menos el id que lleva un - porque lo está restando
        .select('images inStock price slug title -_id')
        .lean();
      await db.disconnect();

      if (!products)
        return res.status(400).json({ message: 'There are no products' });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'There was an error with the request' });
    }
  }

  //Si viene con query
  try {
    let productsByGender = null;

    await db.connect();
    if (gender) {
      productsByGender = await Product.find().where({ gender });
    } else {
      productsByGender = await Product.find().where({ gender: g });
    }
    await db.disconnect();

    if (!productsByGender || productsByGender.length === 0)
      return res
        .status(400)
        .json({ message: 'There was an error with the request' });

    return res.status(200).json(productsByGender);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'There was an error with the request' });
  }
};
