import jwt from "jsonwebtoken";
import {
    AccessTokenPayload,
    RefreshTokenPayload,
} from "../../types/userTypes.js";

const refreshToken = process.env.REFRESHTOKENKEY;
const accessToken = process.env.ACCESSTOKENKEY;

export const generateRefreshToken = (userId: string): RefreshTokenPayload => {
    const token = jwt.sign({ userId }, refreshToken, {
        expiresIn: "7d",
    });

    return {
        userId,
        token,
        exp: 7 * 24 * 60 * 60 * 1000,
    };
};

export const generateAccessToken = (
    userId: string,
    role: "customer" | "admin"
): AccessTokenPayload => {
    const token = jwt.sign({ userId }, accessToken, {
        expiresIn: "15m",
    });

    return {
        userId,
        token,
        role,
        exp: 15 * 60 * 1000,
    };
};

export const verifyRefreshToken = (token: string): { userId: string } => {
    const result = jwt.verify(token, refreshToken) as { userId: string };

    return result;
};

export const verifyAccessToken = (token: string): { userId: string } => {
    const result = jwt.verify(token, accessToken) as { userId: string };

    return result;
};
