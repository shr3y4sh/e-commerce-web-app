import express from 'express';
import userController from '../controllers/user.js';

import { requireAuth, adminAuth } from '../middleware/auth-handle.js';

const router = express.Router();

router.get('/', requireAuth, adminAuth, userController.getUsers);

router.get('/profile', requireAuth, userController.getCurrentUser);

router.put('/profile', requireAuth, userController.updateCurrentUser);

router.get('/:id', requireAuth, adminAuth, userController.getUserById);

router.delete('/:id', requireAuth, adminAuth, userController.deleteUserAsAdmin);

export default router;
