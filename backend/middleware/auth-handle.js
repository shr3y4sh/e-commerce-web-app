import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const requireAuth = async (req, res, next) => {
	const auth = req.headers['Authorization'];
	if (!auth) {
		return res
			.status(401)
			.json({ error: 'Unauthorized for this request.' });
	}

	const token = auth.split(' ')[1];

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findById(decodedToken.userId);

	req.user = user;
	next();
};

export const adminAuth = async (req, res, next) => {
	const user = req.user;

	if (!user.isAdmin) {
		return res.status(403).json({
			message: 'You are not authorized to perform this action'
		});
	}
	next();
};
