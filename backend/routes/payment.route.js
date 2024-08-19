// routes/paymentRoutes.js
import express from 'express';
import { createPaymentOrder, verifyPaymentOrder } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/payment', createPaymentOrder);
router.post('/verify', verifyPaymentOrder);

export default router;
