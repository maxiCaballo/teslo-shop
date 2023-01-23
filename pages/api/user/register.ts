import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';

type Data = { message: string } | { newUser: UserType };

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
      return register(req, res);
    default:
      res.status(400).json({ message: 'http method error' });
  }
  res.status(200).json({ message: 'Example' });
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name = '',
    email = '',
    password = '',
  } = req.body as { name: string; email: string; password: string };

  //Valido usuario
  const { isValidUser, errorMessage } = validations.validateUser(
    email,
    name,
    password
  );
  if (!isValidUser) return res.status(400).json({ message: errorMessage });

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'the email already exist' });
  }

  const newUser = new User({
    name: name.toLocaleLowerCase(),
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
  });

  //*Try catch cuando lo guarada porque es una operacion que puede fallar.
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({
      message: 'Server error!',
    });
  }
  await db.disconnect();

  const { _id, role } = newUser;
  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    newUser: {
      token,
      email,
      name,
      role,
    },
  });
};
