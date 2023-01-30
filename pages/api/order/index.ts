import { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '../../../interfaces/Order';

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
  return res.status(200).json({ ok: true });
};

// Verificar
// que el monto de la orden no haya sido manipulado
