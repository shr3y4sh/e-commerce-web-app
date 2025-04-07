import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import paymentsController from '../controllers/payments.controller.js';
const router = express.Router();

router.post(
	'/create-checkout-session',
	protectedRoute,
	paymentsController.createCheckoutSession
);

export default router;
