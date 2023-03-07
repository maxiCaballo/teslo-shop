import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/models';
import { db } from '@/database';
import { isValidObjectId } from 'mongoose';
import { IUser } from '../../../interfaces';
import { ROLE_CONSTANTS } from '../../../database/constants';

type Data = { message: string } | IUser | IUser[];

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(400).json({ message: 'Http method error' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) return res.status(400).json({ message: 'Invalid userId' });
  if (!ROLE_CONSTANTS.allRoles.includes(role)) return res.status(400).json({ message: 'Invalid role' });

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    await db.disconnect();
    return res.status(400).json({ message: 'user not found in Db ' + userId });
  }
  user.role = role;
  await user.save();

  await db.disconnect();

  return res.status(200).json({ message: 'user updated succesfully' });
};
