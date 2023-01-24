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

export const checkJWT = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_KEY)
    throw new Error('There is not secret key, check envirorment variables');

  return new Promise((resolve, reject) => {
    try {
      //El || '' es porque puede ser nulo la variable de entorno
      //El payload es lo que grabamos en el metodo signToken
      jwt.verify(token, process.env.JWT_SECRET_KEY || '', (error, payload) => {
        if (error) return reject('unauthorized');

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject('unauthorized');
    }
  });
};
