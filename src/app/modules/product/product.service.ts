import { IProduct } from './product.interface';
import Product from './product.model';

export const createProductIntoDB = async (
  data: IProduct,
): Promise<IProduct> => {
  const product = new Product(data);
  await product.save();
  return product;
};

export const getProductsFromDB = async (): Promise<IProduct[]> => {
  const products = await Product.find();
  return products;
};

export const getProductByIdFromDB = async (
  id: string,
): Promise<IProduct | null> => {
  const product = await Product.findById(id);
  return product;
};

export const updateProductByIdIntoDB = async (
  id: string,
  data: IProduct,
): Promise<IProduct | null> => {
  const product = await Product.findByIdAndUpdate(id, data);
  return product;
};

export const deleteProductByIdFromDB = async (
  id: string,
): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const searchProductsIntoDB = async (
  searchTerm: string,
): Promise<IProduct[]> => {
  const products = await Product.find({
    $text: {
      $search: searchTerm,
    },
  });

  return products;
};
