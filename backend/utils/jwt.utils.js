import jwt from 'jsonwebtoken';

import redis from './redis.utils.js';

export const generateAccessToken = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m'
	});

	return accessToken;
};

export const generateRefreshToken = (userId) => {
	const refreshToken = jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: '7d'
		}
	);
	return refreshToken;
};

export const verifyAccessToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		return decodedToken;
	} catch (error) {
		return null;
	}
};

export const verifyRefreshToken = (token) => {
	try {
		const decodedToken = jwt.verify(
			token,
			process.env.REFRESH_TOKEN_SECRET
		);
		return decodedToken;
	} catch (error) {
		return null;
	}
};

export const deleteRefreshToken = async (token) => {
	const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	await redis.del(`refresh token: ${decodedToken.userId}`);
};

export const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(
		`refresh token: ${userId}`,
		refreshToken,
		'EX',
		7 * 24 * 60 * 60
	);
};

export const getRefreshToken = async (userId) => {
	const refreshToken = await redis.get(`refresh token: ${userId}`);
	return refreshToken;
};

export const setCookies = (res, accessToken, refreshToken) => {
	res.cookie('accessToken', accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 15 * 60 * 1000
	});

	if (refreshToken) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
	}
	return res;
};
