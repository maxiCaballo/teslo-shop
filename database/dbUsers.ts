import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';

export const checkUserEmailPassword = async (email: string = '', password: string = '') => {
  if (!email || !password) return null;

  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  //Si no existe usuario o la contraseña esta mal retorno null
  if (!user || !bcrypt.compareSync(password, user.password!)) return null;

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    name,
    role
  };
};
