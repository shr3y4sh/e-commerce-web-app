import express from 'express';
import authController from '../../controllers/auth.js';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);
router.post('/protected/logout', authController.logout);

router.get('/refresh-token', authController.refreshToken);

export default router;
