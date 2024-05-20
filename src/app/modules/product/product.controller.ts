import { NextFunction, Request, Response } from 'express';
import {
  createProductIntoDB,
  deleteProductByIdFromDB,
  getProductByIdFromDB,
  getProductsFromDB,
  searchProductsIntoDB,
  updateProductByIdIntoDB,
} from './product.service';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const req_data = req.body;
    const result = await createProductIntoDB(req_data);
    res.send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchTerm } = req.query;
    let result;
    let message;

    if (searchTerm) {
      result = await searchProductsIntoDB(searchTerm as string);
      message = `Products matching search term '${searchTerm}' fetched successfully!`;
    } else {
      result = await getProductsFromDB();
      message = 'Products fetched successfully!';
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

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await getProductByIdFromDB(productId);

    if (!result) {
      const error = new Error();
      error.name = 'not-found';
      error.message = 'Product not found!';
      throw error;
    }

    res.send({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const req_data = req.body;

    const result = await updateProductByIdIntoDB(productId, req_data);

    if (!result) {
      const error = new Error();
      error.name = 'not-found';
      error.message = "Product doesn't exist!";
      throw error;
    }

    res.send({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await deleteProductByIdFromDB(productId);

    if (!result) {
      const error = new Error();
      error.name = 'not-found';
      error.message = "Product doesn't exist!";
      throw error;
    }

    res.send({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};