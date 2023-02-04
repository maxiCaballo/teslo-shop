import { Order } from '@/models';
import { IOrder } from '@/interfaces';
import { db } from '.';
import { isValidObjectId } from 'mongoose';

export const getOrderById = async (id: string = ''): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  db.connect();
  const order = await Order.findById(id);
  db.disconnect();

  return JSON.parse(JSON.stringify(order));
};
