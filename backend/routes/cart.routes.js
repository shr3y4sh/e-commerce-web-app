import express from 'express';
import { protectedRoute, adminAuth } from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', protectedRoute, cartController.getCart);
router.post('/', protectedRoute, cartController.addToCart);
router.delete('/', protectedRoute, cartController.removeAllFromCart);
router.put('/:id', protectedRoute, cartController.updateQuantity);

export default router;
