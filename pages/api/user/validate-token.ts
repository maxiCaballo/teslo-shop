import { User } from '@/models';
import { jwt } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';

type Data = { message: string } | { user: UserType };

type UserType = {
  token: string;
  name: string;
  email: string;
  role: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);
    default:
      return res.status(400).json({ message: 'http method error' });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies as { token: string };

  let userId = '';

  try {
    userId = await jwt.checkJWT(token);
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  await db.connect();

  const user = await User.findById(userId).lean();

  await db.disconnect();

  if (!user) return res.status(400).json({ message: 'User not found' });

  const { _id, name, email, role } = user;

  res.status(200).json({
    user: {
      token: jwt.signToken(_id, email),
      name,
      email,
      role,
    },
  });
};
