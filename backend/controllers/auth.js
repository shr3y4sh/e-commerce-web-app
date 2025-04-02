import bcrypt from 'bcryptjs';
import User from '../models/user.js';
// import  from '-html';

import generateToken from '../utils/jwt-gen.js';

// POST /api/users/login
const login = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({ error: `User with ${email} not found` });
	}

	let passwordCorrect = await bcrypt.compare(password, user.password);

	passwordCorrect = user === null ? false : passwordCorrect;

	if (!passwordCorrect) {
		res.status(401).json({ message: 'Invalid username or password' });
		return;
	}

	const token = generateToken(user);

	res.status(200).json({ token, username: user.username, email: user.email });
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
		password: passwordHash
	});

	const savedUser = await newUser.save();
	res.status(201).json(savedUser);
};

export default {
	login,
	signup
};
