import { Router } from 'express';
import * as quotationController from '../controllers/quotation.controller';

const router = new Router();

router.post('/', quotationController.addQuotation);
router.get('/', quotationController.getQuotation);
router.patch('/', quotationController.updateQuotation);
router.post('/delete', quotationController.deleteQuotation);
router.get('/all', quotationController.getQuotationList);
router.delete('/all', quotationController.deleteAll);

export default router;
