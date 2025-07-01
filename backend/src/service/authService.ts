import {
    AccessTokenPayload,
    RefreshTokenPayload,
    User,
    UserLogin,
    UserSignup,
} from "../../types/userTypes.js";

import UserModel, { IUser } from "../models/userModel.js";
import { UnauthorizedError } from "../utilities/errorClasses.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utilities/jwtTokens.js";

import {
    checkEmailExistence,
    comparePasswords,
} from "../utilities/verification.js";

export const signup = async (userData: UserSignup): Promise<User> => {
    const user = await UserModel.create(userData);

    if (!user) {
        throw new Error("Internal server error");
    }

    return {
        id: user._id as string,
        ...user,
    };
};

export const loginService = async (
    userData: UserLogin
): Promise<{
    refreshToken: RefreshTokenPayload;
    accessToken: AccessTokenPayload;
}> => {
    const { email, password } = userData;

    // check email and password validation
    const user = await checkEmailExistence(email);

    const passwordCorrect = await comparePasswords(password, user.password);

    if (!passwordCorrect) {
        throw new UnauthorizedError("Invalid email or password");
    }

    // generate refresh and access token
    const refreshToken = generateRefreshToken(user._id as string);
    const accessToken = generateAccessToken(user._id as string, "customer");

    // save in userModel
    user.refreshTokens.push(refreshToken.token);

    // send tokens
    return { refreshToken, accessToken };
};

export const logoutService = async (userData: Express.User): Promise<IUser> => {
    const user = await UserModel.findById(userData.id);

    if (!user) {
        throw new UnauthorizedError("not logged in");
    }

    return user;
};
