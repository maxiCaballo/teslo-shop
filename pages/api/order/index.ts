import { NextApiRequest, NextApiResponse } from 'next';
import { Order, Product } from '../../../models';
import { getSession } from 'next-auth/react';
import { IOrder, IOrderItem } from '../../../interfaces/Order';
import { db } from '../../../database';

type Data = { errorMessage: string } | { newOrder: IOrder };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ errorMessage: 'Invalid http method' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req }); //El token viaja en la cookie

  if (!session) return res.status(401).json({ errorMessage: 'Must be authenticated!' });

  const {
    orderItems,
    orderSummary: { total: frontendTotal }
  } = req.body as IOrder;

  const productsId: string[] = orderItems.map((product) => product._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsId } });
  await db.disconnect();

  if (!dbProducts.length) return res.status(400).json({ errorMessage: 'Check the cart product again...' });

  try {
    const subTotal = orderItems.reduce((acc, curr) => {
      let currentPrice = dbProducts.find((product) => product.id === curr._id)!.price;
      currentPrice *= curr.quantity;
      return acc + currentPrice;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = Number(subTotal * (taxRate + 1));

    console.log(frontendTotal.toFixed(2), backendTotal.toFixed(2));
    if (frontendTotal.toFixed(2) !== backendTotal.toFixed(2)) throw new Error('Total ammount not match ');

    //*Si llego hasta acá es que todo está bien...

    const userId = session.user._id;
    //Mongoose ignora si el usuario manda campos que no están definidos en el modelo por eso puedo hacer el spread
    //del req.body..
    //Is paid false por las dudas que el cliente modifique ese campo...
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      paymentMethod: 'paypal',
      user: userId
    });
    //Redondeo el total
    newOrder.orderSummary.total = Math.round(newOrder.orderSummary.total * 100) / 100;
    await db.connect();
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json({ newOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: 'Total ammount not match ' });
  }
};
