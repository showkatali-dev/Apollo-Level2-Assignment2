import { IOrder } from './order.interface';
import Order from './order.model';

export const createOrderIntoDB = async (data: IOrder) => {
  const order = new Order(data);
  await order.save();
  return order;
};

export const getOrdersFromDB = async () => {
  const orders = await Order.find();
  return orders;
};

export const getOrdersByEmailFromDB = async (email: string) => {
  const orders = await Order.find({ email });
  return orders;
};
