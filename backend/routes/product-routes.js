import productController from '../controllers/product.js';
import express from 'express';

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getOneProduct);

export default router;
