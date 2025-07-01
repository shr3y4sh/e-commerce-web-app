import bcrypt from "bcryptjs";
import UserModel, { IUser } from "../models/userModel.js";
import { ConflictError, UnauthorizedError } from "./errorClasses.js";

export async function checkEmailDuplication(email: string): Promise<void> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new ConflictError(`User with ${email} already exists`);
    }
}
export async function checkEmailExistence(email: string): Promise<IUser> {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        throw new UnauthorizedError(`Invalid email or password`);
    }

    return existingUser;
}

export async function encryptPassword(password: string): Promise<string> {
    const salt = 12;

    const hashedPass = await bcrypt.hash(password, salt);

    return hashedPass;
}

export async function comparePasswords(
    passwd: string,
    hashed: string
): Promise<boolean> {
    const response = await bcrypt.compare(passwd, hashed);

    return response;
}
