import userController from '../controllers/user';

import express from 'express';

const router = express.Router();

// Special just for me, remove later
router.delete('/', userController.deleteAllUser);

router.post('/', userController.createUser);
///////////

export default router;
