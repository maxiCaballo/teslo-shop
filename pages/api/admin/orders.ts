import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/models';
import { db } from '@/database';
import { IOrder } from '../../../interfaces/Order';

type Data = { message: string } | IOrder[];

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const orders = await Order.find().sort({ createdAt: 'desc' }).populate('user', 'name email');
  await db.disconnect();

  if (!orders.length) return res.status(400).json({ message: 'There was an error with the orders request' });

  return res.status(200).json(orders);
}
