import { loggerInfo } from '../utils/logger.utils.js';

export const requestInfo = (req, res, next) => {
	console.log('Method: ', req.method);
	console.log('Path: ', req.path);
	console.log('Body: ', req.body);
	console.log('Cookies: ', req.cookies);
	console.log('---');
	next();
};
