import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: "customer" | "admin";
    refreshTokens: Array<string>;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    refreshTokens: [
        {
            token: String,
        },
    ],
});

export default mongoose.model<IUser>("user", userSchema);
