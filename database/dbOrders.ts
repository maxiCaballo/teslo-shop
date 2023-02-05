import { Order } from '@/models';
import { IOrder } from '@/interfaces';
import { db } from '.';
import { isValidObjectId } from 'mongoose';

export const getOrderById = async (id: string = ''): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const order = await Order.findById(id);
  await db.disconnect();

  return JSON.parse(JSON.stringify(order));
};
