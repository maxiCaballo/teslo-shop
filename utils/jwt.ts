import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_KEY)
    throw new Error('There is not secret key, check envirorment variables');

  return jwt.sign(
    //payload
    { _id, email },
    //key
    process.env.JWT_SECRET_KEY,
    //Options
    { expiresIn: '30d' }
  );
};
