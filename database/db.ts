import mongoose from 'mongoose';

/*
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  //1- me fijo si el objeto que cree para saber si estoy conectado, está conectado.
  if (mongoConnection.isConnected) {
    console.log('already connected');
    return;
  }
  //2-si el objeto que cree para saber si estoy conectado, no está conectado
  // me fijo si hay alguna conexion guardada en mongoose y si estoy conectado a ella.
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log('Using previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  //3- si no estoy conectado y no tengo ninguna conexion guardada en la que esté
  //conectado, me conecto
  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log('connected to MongoDb:', process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log('Disconnected from mongoDb');
};
