import { Router } from 'express';
import * as orderController from '../controllers/order.controller';

const router = new Router();

router.post('/', orderController.addOrder);
router.get('/', orderController.getOrder);
router.patch('/', orderController.updateOrder);
router.post('/delete', orderController.deleteOrder);
router.get('/all', orderController.getOrderList);
router.delete('/all', orderController.deleteAll);

export default router;
