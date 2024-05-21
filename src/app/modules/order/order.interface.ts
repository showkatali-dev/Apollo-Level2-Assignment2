import mongoose from 'mongoose';

interface IOrder {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

export { IOrder };
