import { IOrder } from './order.interface';
import Order from './order.model';

export const createOrderIntoDB = async (data: IOrder) => {
  const order = new Order(data);
  await order.save();
  return order;
};

export const getOrdersFromDB = async (email: string | undefined) => {
  if (email) {
    const orders = await Order.find({ email });
    return orders;
  }
  const orders = await Order.find();
  return orders;
};
