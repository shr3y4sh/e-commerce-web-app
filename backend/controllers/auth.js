import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
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

	res.status(200).json({ token });
};

// POST /api/users/logout
const logout = async (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logout successful' });
};

const signup = async (req, res) => {
	const { username, email, password, confirmpassword } = req.body;

	if (!(username && password && email)) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	const existingUser = await User.findOne({ email: email });

	if (existingUser) {
		return res.status(400).json({ message: 'Email already exists' });
	}

	if (password !== confirmpassword) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}

	if (password.length < 5) {
		return res.status(400).json({
			message: 'Password must be at least 5 characters long'
		});
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const newUser = new User({
		username,
		email,
		password: passwordHash,
		isAdmin: false
	});

	const savedUser = await newUser.save();
	res.status(201).json(savedUser);
};

const refreshToken = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decodedToken.userId);
	const newToken = generateToken(user);
	return res.status(200).json({ token: newToken });
};

export default {
	login,
	logout,
	signup,
	refreshToken
};
