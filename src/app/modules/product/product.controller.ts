import { NextFunction, Request, Response } from 'express';
import {
  createProductIntoDB,
  deleteProductByIdFromDB,
  getProductByIdFromDB,
  getProductsFromDB,
  updateProductByIdIntoDB,
} from './product.service';
import { productValidationSchema } from './product.validation';
import { IProduct } from './product.interface';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const req_data = req.body;

    // product validation by zod
    const zodParsedData = productValidationSchema.parse(req_data);

    // create product
    const result = await createProductIntoDB(zodParsedData);
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
    const result = await getProductsFromDB(searchTerm as string | undefined);

    if (result.length === 0) {
      const error = new Error();
      error.name = 'not-found';
      error.message = 'No products found!';
      throw error;
    }

    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Products fetched successfully!';

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
    const req_data: IProduct = req.body;

    const zodParsedData = productValidationSchema.parse(req_data);

    const result = await updateProductByIdIntoDB(productId, zodParsedData);

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
