import { Schema, model } from 'mongoose';
import { IProduct, IVariant } from './product.interface';

const variantSchema = new Schema<IVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
    inventory: {
      type: {
        quantity: Number,
        inStock: Boolean,
      },
      required: true,
    },
  },
  { versionKey: false },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
