import { Request, Response, NextFunction } from 'express';
import { loginInputSchema, registrationInputSchema } from '../types/users';

export const requestInfo = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	console.log('Method: ', req.method);
	console.log('Path: ', req.path);
	console.log('Body: ', req.body);
	console.log('Cookies: ', req.cookies);
	console.log('---');
	next();
};
export const registrationParse = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const { password, confirmPassword } = registrationInputSchema.parse(
			req.body
		);

		if (password !== confirmPassword) {
			throw new Error("Passwords don't match");
		}

		next();
	} catch (err) {
		next(err);
	}
};

export const loginParse = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		loginInputSchema.parse(req.body);
		next();
	} catch (err) {
		next(err);
	}
};
