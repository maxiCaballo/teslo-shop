import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema(
  {
    name    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role    : {
      type  : String,
      enum  : {
        values  : ['admin', 'client'],
        message : '{VALUE} is not a valid role',
        default : 'client',
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;

//*Ejemplos que puedo implementar en algun futuro.
/*
//*Metodos que puedo llamar cuando tengo una instancia de user
userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.hashNewPassword = async function (password) {
  return await bcrypt.hash(password, 1);
};

//*Metodo que hashea la password antes de guardar el usuario
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 1);
  next();
});

//*Estoy modificando el metodo toJSON que se activa cuando se llama al metodo
//* json.stringify y cuando se envía una respuesta .send - .json()
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
//*Enviar propiedades que no estan definidas en el schema
userSchema.set("toJSON", { virtuals: true });
*/
