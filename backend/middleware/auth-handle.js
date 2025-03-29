import { expressjwt } from 'express-jwt';
import User from '../models/user.js';

export const requireAuth = expressjwt({
	secret: () => process.env.JWT_SECRET,
	algorithms: ['HS256']
});

export const adminAuth = async (req, res, next) => {
	const user = await User.findById(req.auth.userId);

	if (!user.isAdmin) {
		return res.status(403).json({
			message: 'You are not authorized to perform this action'
		});
	} else {
		req.user = user;
		next();
	}
};
