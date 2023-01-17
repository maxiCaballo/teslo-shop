import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String }], //Array de strings
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} is not a valid size', //Si hay error en el status envía este mensaje
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} is not a valid type',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} is not a valid gender',
      },
    },
  },
  {
    timestamps: true, //Para que me cree automaticamente el createdAt y el updatedAt en la bd.
  }
);

//* Índice de texto en las propiedades title y tags para buscar rapidamente.
productSchema.index({ title: 'text', tags: 'text' });

// Si el modelo ya esta creado lo voy a obtener del models.Entry
// sinó creo la instancia pasandole el nombre 'Entry' y el entrySchema.
const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', productSchema); //Mongo lo pone por defecto en pluarl Products

export default ProductModel;
