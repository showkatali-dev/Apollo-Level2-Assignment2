import { ObjectId } from 'mongoose';

interface IOrder {
  email: string;
  productId: ObjectId;
  price: number;
  quantity: number;
}

export { IOrder };
