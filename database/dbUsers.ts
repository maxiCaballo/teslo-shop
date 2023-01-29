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

export const checkUserWithOAuth = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();

    const { _id, name, email, role } = user;
    return { _id, email, name, role };
  }

  const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' });
  //El save podría fallar, se podria colocar dentro de un try catch
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, email, name, role };
};
