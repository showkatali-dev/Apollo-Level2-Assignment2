import { NextFunction, Request, Response } from 'express';
import { createOrderIntoDB, getOrdersFromDB } from './order.service';
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
    const result = await getOrdersFromDB(email as string | undefined);

    if (result.length === 0) {
      const error = new Error();
      error.name = 'not-found';
      error.message = 'No orders found!';
      throw error;
    }

    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';

    res.send({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
