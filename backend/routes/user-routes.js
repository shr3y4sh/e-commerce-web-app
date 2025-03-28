import express from 'express';
import userController from '../controllers/user.js';
import authController from '../controllers/auth.js';

import {
	authenticateToken,
	authorizeAdmin
} from '../middleware/auth-handle.js';

const router = express.Router();

router.get('/', authenticateToken, authorizeAdmin, userController.getUsers);

router.post('/', userController.createUser);

router.get('/profile', authenticateToken, userController.getCurrentUser);

router.put('/profile', authenticateToken, userController.updateCurrentUser);

// Special just for me, remove later
router.delete('/', userController.deleteAllUser);
///////////

router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
