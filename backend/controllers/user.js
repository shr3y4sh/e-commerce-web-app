import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
// import  from '-html';

// GET /api/users
const getUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
};

// GET /api/users/profile
const getCurrentUser = (req, res) => {
	const user = req.user;
	res.status(200).json({ username: user.username, email: user.email });
};

// PUT /api/users/profile
const updateCurrentUser = async (req, res) => {
	let user = await User.findById(req.user.id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	if (req.body.username) {
		user.username = req.body.username;
	}

	if (req.body.email) {
		user.email = req.body.email;
	}

	if (req.body.oldpassword && req.body.newpassword) {
		const isMatch = await bcrypt.compare(
			req.body.oldpassword,
			user.password
		);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const hashedPassword = await bcrypt.hash(req.body.newpassword, 10);
		user.password = hashedPassword;
	}

	user = await user.save();
	return res.status(200).json(user);
};

// GET /api/users/:id
const getUserById = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json(user);
};

// DELETE /api/users/:id

const deleteUserAsAdmin = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}
	await user.deleteOne();
	res.status(204).json({ message: 'User deleted' });
};

// DELETE /api/users/
const deleteAllUser = async (req, res) => {
	await User.deleteMany({});

	res.status(204).json({ message: 'All users deleted' });
};

// POST /api/users/
const createUser = async (req, res) => {
	const { username, email, password, isAdmin } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({
		username,
		email,
		password: hashedPassword,
		isAdmin
	});
	await user.save();
	res.status(201).json(user);
};

export default {
	getUsers,
	getCurrentUser,
	updateCurrentUser,
	getUserById,
	deleteUserAsAdmin,
	deleteAllUser,
	createUser
};
