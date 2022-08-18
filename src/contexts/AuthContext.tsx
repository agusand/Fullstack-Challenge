import React, { useState, useContext, createContext, FC } from "react";

import { AuthContextInterface } from "../types/AuthContextInterface";
import { ServerUser } from "../types/UserInterface";

import { saveJWT, removeJWT } from "../utils/authStorageManager";

const AuthContext = createContext<Partial<AuthContextInterface>>({});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({} as ServerUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: "" });

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError({ state: false, message: "" });
        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                saveJWT(data.token);
                setIsAuthenticated(true);
                setUser(data.user as ServerUser);
            } else {
                setError({ state: true, message: data.message });
            }
        } catch (error: any) {
            setError({ state: true, message: error.message });
        } finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        setIsLoading(true);
        setError({ state: false, message: "" });
        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (data.success) {
                removeJWT();
                setIsAuthenticated(false);
                setUser({} as ServerUser);
            } else {
                setError({ state: true, message: data.message });
            }
        } catch (error: any) {
            setError({ state: true, message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ login, logout, isAuthenticated, user, isLoading, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
