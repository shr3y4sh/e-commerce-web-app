export interface User extends Express.User {
    email: string;
    password: string;
    role: "customer" | "admin";
}

export type UserLogin = Pick<User, "email" | "password">;

export interface UserSignup extends UserLogin {
    confirmPassword: string;
}

export interface RefreshTokenPayload {
    userId: string;
    token: string;
    exp: number;
}

export interface AccessTokenPayload extends RefreshTokenPayload {
    role: "customer" | "admin";
}
