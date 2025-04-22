import UsersModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import { LoginInput, RegistrationInput, User } from '../types/users';

export const register = async (user: RegistrationInput): Promise<User> => {
	const { username, email, password } = { ...user };

	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = new UsersModel({
		username,
		email,
		password: hashedPassword
	});

	await newUser.save();

	return newUser;
};

export const login = async (userInput: LoginInput): Promise<User> => {
	const { email, password } = userInput;
	const user = await UsersModel.findOne({ email });
	if (!user) {
		throw new Error('Invalid credentials');
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		throw new Error('Invalid credentials');
	}
	return user;
};
