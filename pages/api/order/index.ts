import { NextApiRequest, NextApiResponse } from 'next';
import { Order, Product } from '../../../models';
import { getSession } from 'next-auth/react';
import { IOrder, IOrderItem } from '../../../interfaces/Order';
import { db } from '../../../database';

type Data = { ok: boolean; errorMessage: string } | { ok: boolean; order?: IOrder };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ ok: false, errorMessage: 'Invalid http method' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req }); //El token viaja en la cookie

  if (!session) return res.status(401).json({ ok: false, errorMessage: 'Must be authenticated!' });

  const {
    orderItems,
    shippingAddress,
    orderSummary: { total: frontendTotal },
    orderSummary
  } = req.body as IOrder;

  const productsId: string[] = orderItems.map((product) => product._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsId } });
  await db.disconnect();

  if (!dbProducts.length || orderItems.length !== dbProducts.length)
    res.status(400).json({ ok: false, errorMessage: 'Check the cart product again...' });

  try {
    const subTotal = orderItems.reduce((acc, curr) => {
      let currentPrice = dbProducts.find((product) => product.id === curr._id)!.price;
      currentPrice *= curr.quantity;
      return acc + currentPrice;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = Number(subTotal * (taxRate + 1));

    if (frontendTotal.toFixed(2) !== backendTotal.toFixed(2)) throw new Error('Total ammount not match ');

    //*Si llego hasta acá es que todo está bien...
    const userId = session.user._id;
    console.log(orderItems);
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      orderSummary,
      isPaid: false,
      paymentMethod: 'paypal',
      user: userId
    });
    await newOrder.save();

    return res.status(201).json({ ok: true, order: newOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ ok: false, errorMessage: 'Total ammount not match ' });
  }
};
