import { NextFunction, Request, Response } from 'express';
import {
  createOrderIntoDB,
  getOrdersByEmailFromDB,
  getOrdersFromDB,
} from './order.service';
import mongoose from 'mongoose';

export const cerateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const req_data = req.body;
    const { productId: product_id } = req_data;
    const productId = new mongoose.Types.ObjectId(product_id as string);
    const result = await createOrderIntoDB({ ...req_data, productId });
    res.send({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.query;
    let result, message;
    if (email) {
      result = await getOrdersByEmailFromDB(email as string);
      message = 'Orders fetched successfully for user email!';
    } else {
      result = await getOrdersFromDB();
      message = 'Orders fetched successfully!';
    }

    res.send({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
