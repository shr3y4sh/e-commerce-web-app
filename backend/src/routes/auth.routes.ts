import express, { Request, Response } from 'express';
import { login, register } from '../controllers/auth.controller';
import {
	LoginInput,
	RegistrationInput,
	TokenPayload,
	User
} from '../types/users';
import { loginParse, registrationParse } from '../middlewares/zod-parse';

const router = express.Router();

router.post(
	'/signup',
	registrationParse,
	async (
		req: Request<unknown, unknown, RegistrationInput>,
		res: Response<User>
	) => {
		const newUser = await register(req.body);
		res.status(201).json(newUser);
	}
);

router.post(
	'/login',
	loginParse,
	async (
		req: Request<unknown, unknown, LoginInput>,
		res: Response<TokenPayload>
	) => {
		const user = await login(req.body);
	}
);

// router.get('/profile', authController.getProfile);
export default router;
