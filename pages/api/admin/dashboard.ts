import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Order, Product, User } from '@/models';

type Data =
  | {
      orders: {
        total: number;
        paid: number;
        pending: number;
      };
      products: {
        total: number;
        outOfStock: number; // 0
        lowInventory: number; // 10 o menos
      };
      totalClients: number; // role Client
    }
  | { message: string };

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getDashboardInfo(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

const getDashboardInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //TODO implementar middleware para verificar que sea admin el que esté haciendo la solicitud

  await db.connect();

  const [totalOrders, paid, totalProducts, outOfStock, lowInventory, totalClients] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $gt: 0, $lte: 10 } }).count(),
    User.find({ role: 'client' }).count()
  ]);
  await db.disconnect();

  return res.status(200).json({
    orders: {
      total: totalOrders,
      paid,
      pending: totalOrders - paid
    },
    products: {
      total: totalProducts,
      outOfStock,
      lowInventory
    },
    totalClients
  });
};
