import { z } from 'zod';

export const registrationInputSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(6, 'Password must be atleast six characters'),
	confirmPassword: z.string()
});

export const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegistrationInput = z.infer<typeof registrationInputSchema>;

export interface User extends LoginInput {
	username: string;
	role: 'user' | 'admin';
	createdAt: Date;
	updatedAt: Date;
}

export interface RefreshToken {
	userId: string;
	token: string;
	expiryDate: Date;
}

export type TokenPayload = {
	userId: string;
	value: string;
};
