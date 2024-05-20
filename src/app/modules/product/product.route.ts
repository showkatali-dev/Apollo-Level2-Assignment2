import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from './product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProductById);
router.delete('/:productId', deleteProductById);

export const productRoute = router;
