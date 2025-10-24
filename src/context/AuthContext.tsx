import {createContext, type ReactNode, useEffect, useState} from "react";
import type {UserLogin, UserRegister} from "../types/auth.ts";
import { authService } from "../services/auth.service.ts";
import { useNavigate } from "react-router-dom";
import { storageService } from "../services/storage.service.ts";
import { STORAGE_KEY } from "../utils/constants.ts";

interface AuthContextType {
    user: UserRegister | UserLogin | null;
    isAuth: boolean;
    error: string | null;
    register: (user: UserRegister) => void;
    login: (user: UserLogin) => void;
    logout: () => void;
    clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserRegister | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = storageService.get(STORAGE_KEY.CURRENT_SESSION);
        if (sessionId) {
            const users = storageService.get(STORAGE_KEY.AUTH);
            const currentUser = users?.find((u: UserRegister) => u.id === sessionId);
            if (currentUser) {
                setUser(currentUser);
                setIsAuth(true);
            }
        }
    }, []);

    const register = (user: UserRegister) => {
        if (user.username.length < 3) {
            setError("Username must be at least 3 characters!");
            return;
        }

        if (!user.email || user.email.trim() === '') {
            setError("Email is required!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            setError("Invalid email format!");
            return;
        }

        if (user.password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }

        try {
            const newUser = authService.register(user);
            setUser(newUser);
            setIsAuth(true);
            navigate('/catalog');

        } catch(err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
        }
    }


    const login = (user: UserLogin) => {
        if (user.username.length < 3) {
            setError("Username must be at least 3 characters!");
            return;
        }

        if (user.password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }

        try {
            const newUser = authService.login(user);
            setUser(newUser);
            setIsAuth(true);
            navigate('/catalog');

        } catch(err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
        }
    }

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        setError(null);
        authService.logout();
        navigate('/login');
    }

    const clearError = () => {
        setError(null);
    }

    return (
        <AuthContext.Provider value={{user, isAuth, error, register, login, logout, clearError}}>
            {children}
        </AuthContext.Provider>
    )
}