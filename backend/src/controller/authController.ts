import { Request, Response } from "express";
import {
    checkEmailDuplication,
    encryptPassword,
} from "../utilities/verification.js";
import { logoutService, signup, loginService } from "../service/authService.js";
import {
    AccessTokenPayload,
    RefreshTokenPayload,
    UserLogin,
    UserSignup,
} from "../../types/userTypes.js";
import { AuthRequest } from "../../index.js";

export const register = async (
    req: Request<unknown, unknown, UserSignup>,
    res: Response<{ token: string }>
): Promise<void> => {
    const user = req.body;

    await checkEmailDuplication(user.email);

    const passwordHash = await encryptPassword(user.password);

    const resUser = await signup({
        ...user,
        password: passwordHash,
    });

    const { refreshToken, accessToken } = await loginService(resUser);

    createResponse(refreshToken, accessToken, res);
};

export const login = async (
    req: Request<unknown, unknown, UserLogin>,
    res: Response<{ token: string }>
): Promise<void> => {
    const userdata = req.body;
    const { refreshToken, accessToken } = await loginService(userdata);

    createResponse(refreshToken, accessToken, res);
};

export const logout = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    res.clearCookie("refreshToken");

    const user = await logoutService(req.user);

    user.refreshTokens = [];

    await user.save();

    res.sendStatus(204);
};

function createResponse(
    refreshToken: RefreshTokenPayload,
    accessToken: AccessTokenPayload,
    res: Response<{ token: string }>
): void {
    res.cookie("refreshToken", refreshToken.token, {
        httpOnly: true,
        secure: true,
        maxAge: refreshToken.exp,
    });

    res.status(201).json({ token: accessToken.token });
}
