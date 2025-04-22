import { sign, verify } from 'jsonwebtoken';
import { z } from 'zod';
import { RefreshToken } from '../types/users';
import RefreshTokenModel from '../models/refresh.models';

const accessKey = z.string().parse(process.env.ACCESS_TOKEN_SECRET);
const refreshKey = z.string().parse(process.env.REFRESH_TOKEN_SECRET);

export const generateAccessToken = (userId: string): string => {
	return sign({ userId }, accessKey, {
		expiresIn: '15m'
	});
};

export const generateRefreshToken = async (
	userId: string
): Promise<RefreshToken> => {
	const refreshToken = sign({ userId }, refreshKey, {
		expiresIn: '7d'
	});

	const token = new RefreshTokenModel({
		userId,
		token: refreshToken,
		expiryDate: Date.now() + 1000 * 60 * 60 * 24 * 7
	});
	await token.save();
	return token;
};

export const verifyAccessToken = (token: string) => {
	try {
		const decodedToken = verify(token, accessKey);
		return decodedToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const verifyRefreshToken = (token: string) => {
	try {
		const decodedToken = verify(token, refreshKey);
		return decodedToken;
	} catch (error) {
		console.log(error);

		return null;
	}
};
