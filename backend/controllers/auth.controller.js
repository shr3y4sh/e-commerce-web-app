import User from '../models/user.model.js';
import {
	generateRefreshToken,
	generateAccessToken,
	storeRefreshToken,
	setCookies,
	deleteRefreshToken,
	verifyRefreshToken,
	getRefreshToken
} from '../utils/jwt.utils.js';

////
export const getAllUsersSecret = async () => {
	return await User.find({});
};
////

function createTokens(user) {
	return {
		accessToken: generateAccessToken(user.id),
		refreshToken: generateRefreshToken(user.id)
	};
}

const postSignup = async (req, res) => {
	const { username, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json({
			message: `User with ${email} already exists`
		});
	}

	let user = new User({ username, email, password });

	await user.save();

	const { accessToken, refreshToken } = createTokens(user.toJSON());

	await storeRefreshToken(user.toJSON().id, refreshToken);

	res = setCookies(res, accessToken, refreshToken);

	res.status(201).json({
		...user,
		message: 'User created successfully'
	});
};

const postLogin = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	const isPasswordValid = await user.comparePassword(password);

	if (!isPasswordValid) {
		return res.status(400).json({
			message: 'Invalid email or password'
		});
	}

	const { accessToken, refreshToken } = createTokens(user.toJSON());

	await storeRefreshToken(user.toJSON().id, refreshToken);

	res = setCookies(res, accessToken, refreshToken);

	res.status(200).json({
		...user,
		message: 'Login successful'
	});
};

const postLogout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(400).json({
			message: 'No refresh token found'
		});
	}

	await deleteRefreshToken(refreshToken);

	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');

	res.status(200).json({
		message: 'Logout successful'
	});
};

const refreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(401).json({
			message: 'No refresh token found'
		});
	}

	const decodedToken = verifyRefreshToken(refreshToken);

	const storedRefreshToken = await getRefreshToken(decodedToken.userId);

	if (storedRefreshToken !== refreshToken) {
		return res.status(401).json({
			message: 'Invalid refresh token'
		});
	}

	const accessToken = generateAccessToken(decodedToken.id);

	res = setCookies(res, accessToken);

	res.status(201).json({
		message: 'Refresh token successful'
	});
};

export default { postSignup, postLogin, postLogout, refreshToken };
