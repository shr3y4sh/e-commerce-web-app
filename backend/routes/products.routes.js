import express from 'express';

import { protectedRoute, adminAuth } from '../middlewares/auth.middleware.js';
import productsController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', protectedRoute, adminAuth, productsController.getAllProducts);

router.get('/featured', productsController.getFeaturedProducts);

router.get('/category/:category', productsController.getProductsByCategory);

router.get('/recommended', productsController.getRecommendedProducts);

router.post(
	'/create-product',
	protectedRoute,
	adminAuth,
	productsController.createProduct
);
router.patch(
	'/:id',
	protectedRoute,
	adminAuth,
	productsController.makeProductFeatured
);
router.delete(
	'/:id',
	protectedRoute,
	adminAuth,
	productsController.deleteProduct
);
export default router;
