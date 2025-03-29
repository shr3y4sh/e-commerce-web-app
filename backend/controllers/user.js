import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// GET /api/users
const getUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
};

// POST /api/users
const createUser = async (req, res) => {
	let newUser = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		isAdmin: req.body.isAdmin || false
	};

	if (!(newUser.username && newUser.password && newUser.email)) {
		res.status(400).json({ message: 'Missing required fields' });
		return;
	}

	if (newUser.password.length < 5) {
		res.status(400).json({
			message: 'Password must be at least 5 characters long'
		});
		return;
	}

	const passwordHash = await bcrypt.hash(newUser.password, 10);
	newUser.password = passwordHash;

	newUser = new User(newUser);

	const savedUser = await newUser.save();
	res.status(201).json(savedUser);
};

// GET /api/users/profile
const getCurrentUser = async (req, res) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json(user);
};

// PUT /api/users/profile
const updateCurrentUser = async (req, res) => {
	let user = await User.findById(req.user.id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	if (req.body.newUsername) {
		user.username = req.body.newUsername;
	}

	if (req.body.newEmail) {
		user.email = req.body.newEmail;
	}

	// changing username and email is simple
	// password will need more logic here
	// oldpassword things and all

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

export default {
	getUsers,
	createUser,
	getCurrentUser,
	updateCurrentUser,
	getUserById,
	deleteUserAsAdmin,
	deleteAllUser
};
