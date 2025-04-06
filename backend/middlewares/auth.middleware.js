import { verifyAccessToken } from '../utils/jwt.utils.js';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		return res.status(401).json({
			message: 'No access token found - Unauthorized'
		});
	}

	const decodedToken = verifyAccessToken(accessToken);

	const user = await User.findById(decodedToken.userId);

	if (!user) {
		return res.status(401).json({
			message: 'User not found - Wrong token'
		});
	}

	const userJSON = user.toJSON();

	req.user = userJSON;

	next();
};

export const adminAuth = (req, res, next) => {
	const user = req.user;

	if (!user || user.role !== 'admin') {
		return res.status(403).json({
			message: 'Unauthorized - Admin only'
		});
	}

	next();
};
