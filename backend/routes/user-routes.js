import express from 'express';
import userController from '../controllers/user.js';
import authController from '../controllers/auth.js';

import { requireAuth, adminAuth } from '../middleware/auth-handle.js';

const router = express.Router();

router.get('/', requireAuth, adminAuth, userController.getUsers);

router.get('/profile', requireAuth, userController.getCurrentUser);

router.put('/profile', requireAuth, userController.updateCurrentUser);

router.get('/:id', requireAuth, adminAuth, userController.getUserById);

router.delete('/:id', requireAuth, adminAuth, userController.deleteUserAsAdmin);

// Special just for me, remove later
router.delete('/', userController.deleteAllUser);

router.post('/', userController.createUser);
///////////

router.post('/signup', authController.signup);

router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
