import express from 'express';

import { protectedRoute, adminAuth } from '../middlewares/auth.middleware.js';
import productsController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', protectedRoute, adminAuth, productsController.getAllProducts);

router.get('/featured', productsController.getFeaturedProducts);

export default router;
