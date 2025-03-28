import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const authenticateToken = async (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findById(decodedToken.userId);

	req.user = user;

	next();
};

const authorizeAdmin = async (req, res, next) => {
	if (!req.user.isAdmin || !req.user) {
		res.status(403).json({ message: 'Forbidden' });
		return;
	}

	next();
};

export { authenticateToken, authorizeAdmin };
