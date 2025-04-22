import { Schema, model } from 'mongoose';
import { RefreshToken } from '../types/users';

const refreshTokenSchema = new Schema<RefreshToken>({
	userId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	expiryDate: {
		type: Date,
		required: true
	}
});

const RefreshTokenModel = model('refresh_token', refreshTokenSchema);

export default RefreshTokenModel;
