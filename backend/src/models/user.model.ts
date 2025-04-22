import { Schema, model } from 'mongoose';
import { User } from '../types/users';

const userSchema = new Schema<User>(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true,
			default: 'user'
		}
	},
	{ timestamps: true }
);

const UsersModel = model<User>('user', userSchema);

export default UsersModel;
