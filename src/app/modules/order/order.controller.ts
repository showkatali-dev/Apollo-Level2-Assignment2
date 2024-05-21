import { NextFunction, Request, Response } from 'express';
import { createOrderIntoDB, getOrdersFromDB } from './order.service';
import mongoose from 'mongoose';
import {
  getProductByIdFromDB,
  updateProductByIdIntoDB,
} from '../product/product.service';
import { orderValidationSchema } from './order.validation';
import { IOrder } from './order.interface';

export const cerateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const req_data: IOrder = req.body;
    const zodParsedData = orderValidationSchema.parse(req_data);

    const { productId: product_id } = zodParsedData;

    // check if the product exists
    const product = await getProductByIdFromDB(product_id);
    if (!product) {
      const error = new Error();
      error.name = 'not-found';
      error.message = 'The product you are trying to order does not exist!';
      throw error;
    }

    // check if the product is in stock
    if (product.inventory.inStock === false) {
      const error = new Error();
      error.message = 'Insufficient quantity available in inventory!';
      throw error;
    }

    if (zodParsedData.quantity > product.inventory.quantity) {
      const error = new Error();
      error.message = `Insufficient quantity available in inventory! Only ${product.inventory.quantity} products available.`;
      throw error;
    }

    // create order
    const productId = new mongoose.Types.ObjectId(product_id as string);
    const result = await createOrderIntoDB({ ...zodParsedData, productId });

    // update product inventory after create an order
    product.inventory = {
      quantity: product.inventory.quantity - zodParsedData.quantity,
      inStock:
        product.inventory.quantity > zodParsedData.quantity ? true : false,
    };
    await updateProductByIdIntoDB(product_id, product);

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
