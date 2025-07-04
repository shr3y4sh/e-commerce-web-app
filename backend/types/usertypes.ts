export interface UserLogin {
    email: string;
    password: string;
}

export interface UserSignup extends UserLogin {
    firstName: string;
    lastname: string;
}
