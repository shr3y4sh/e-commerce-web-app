import express from 'express';
import productController from '../../controllers/product.js';
import { requireAuth, adminAuth } from '../../middleware/auth-handle.js';

const router = express.Router();

router.post('/', requireAuth, adminAuth, productController.createProduct);

router.put('/:id', requireAuth, adminAuth, productController.editProduct);

router.delete('/:id', requireAuth, adminAuth, productController.deleteProduct);

export default router;
