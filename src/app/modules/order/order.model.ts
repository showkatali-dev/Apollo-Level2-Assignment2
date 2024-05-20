import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const { ObjectId } = Schema.Types;

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
