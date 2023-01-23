import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/models';

import { db } from '../../../database';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';

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
    case 'POST':
      return login(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint error' });
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  await db.connect();

  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user) return res.status(400).json({ message: 'Error: user not found' });

  if (!bcrypt.compareSync(password, user.password!))
    return res.status(400).json({ message: 'Error: password' });

  const { role, name, _id } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    user: {
      token, //jason web token JWT
      email,
      name,
      role,
    },
  });
};
