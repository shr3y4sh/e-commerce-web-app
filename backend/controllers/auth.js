import bcrypt from 'bcryptjs';
import User from '../models/user.js';

import generateToken from '../utils/jwt-gen.js';

// POST /api/users/login
const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	let passwordCorrect = await bcrypt.compare(password, user.password);

	passwordCorrect = user === null ? false : passwordCorrect;

	if (!passwordCorrect) {
		res.status(401).json({ message: 'Invalid username or password' });
		return;
	}

	const token = generateToken(user);

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000 // 24 hour age
	});

	res.status(200).json({ message: 'Login successful' });
};

// POST /api/users/logout
const logout = async (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logout successful' });
};

export default {
	login,
	logout
};
