import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/models';

import axios from 'axios';
import { IPaypalOrderResponse } from '../../../interfaces';
import { db } from '@/database';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials'); //Formato x-www-form-urlencoded

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //TODO: validar mongoId
  //TODO: validar session de usuario

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) return res.status(400).json({ message: 'Paypal token error' });

  const { transactionId = '', orderId = '' } = req.body;
  const URL_Paypal_Order = `${process.env.PAYPAL_ORDERS_URL || ''}/${transactionId}`;

  const { data } = await axios.get<IPaypalOrderResponse>(URL_Paypal_Order, {
    headers: {
      Authorization: `Bearer ${paypalBearerToken}`
    }
  });

  if (data.status !== 'COMPLETED') res.status(400).json({ message: 'Order status in paypal is not completed' });

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res.status(400).json({ message: 'Order not found in db' });
  }

  if (dbOrder.orderSummary.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(400).json({ message: 'The amounts do not match' });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  await db.disconnect();

  return res.status(200).json({ message: 'Ok!' });
};

//getPaypalBearerToken -> Le envío a paypal las credenciales que el me proporcionó para autenticarme que son el client_id y el access_token
//y el me devuelve un token y con ese token basicamente le puedo preguntar 'ya estoy autenticado, no me pasas esta compra?' y ahi chequeo la compra
//que me devuelve con la orden que generé en la base de datos.
