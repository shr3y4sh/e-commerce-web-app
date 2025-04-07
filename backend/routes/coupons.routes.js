import express from 'express';
import couponController from '../controllers/coupon.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protectedRoute, couponController.getCoupon);

router.get('/validate', couponController.validateCoupon);

export default router;
