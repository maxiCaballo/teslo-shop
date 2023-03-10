import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/models';
import { db } from '@/database';
import { IProduct } from '../../../interfaces/Products';
import { isValidObjectId } from 'mongoose';

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

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body;

  if (!isValidObjectId(_id)) return res.status(404).json({ message: 'MongoId error' });

  if (images.length < 2) return res.status(400).json({ message: 'At least 2 images required' });

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: 'There is no product with id: ' + _id });
    }

    //TODO: eliminar fotos en cloudinary
    //Si hay alguna propiedad que no coincida o no exista en el modelo da error
    await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(400).json({ message: 'There was an error during update' });
  }
};
