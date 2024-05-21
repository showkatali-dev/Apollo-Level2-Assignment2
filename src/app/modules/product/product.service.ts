import { IProduct } from './product.interface';
import Product from './product.model';

export const createProductIntoDB = async (data: IProduct) => {
  const product = new Product(data);
  await product.save();
  return product;
};

export const getProductsFromDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const regex = RegExp(searchTerm, 'i');
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { tags: regex },
      ],
    });
    return products;
  }
  const products = await Product.find();
  return products;
};

export const getProductByIdFromDB = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

export const updateProductByIdIntoDB = async (id: string, data: IProduct) => {
  const product = await Product.findByIdAndUpdate(id, data);
  return product;
};

export const deleteProductByIdFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
