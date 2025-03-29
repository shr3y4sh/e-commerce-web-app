import express from 'express';
import productController from '../controllers/product.js';
import {
	authenticateToken,
	authorizeAdmin
} from '../middleware/auth-handle.js';

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getOneProduct);

router.post(
	'/',
	authenticateToken,
	authorizeAdmin,
	productController.createProduct
);

router.put('/:id', productController.editProduct);

router.delete('/:id', productController.deleteProduct);

export default router;
