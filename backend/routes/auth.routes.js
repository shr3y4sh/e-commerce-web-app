import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/refresh-token', authController.refreshToken);

// router.get('/profile', authController.getProfile);
export default router;
