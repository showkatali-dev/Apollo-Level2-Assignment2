import { Router } from 'express';
import { cerateOrder, getAllOrders } from './order.controller';

const router = Router();

router.post('/', cerateOrder);
router.get('/', getAllOrders);

export const orderRoute = router;
