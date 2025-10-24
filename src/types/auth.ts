export interface UserRegister {
    id?: string;
    username: string;
    email: string;
    password: string;
}

export interface UserLogin {
    username: string;
    password: string;
}
