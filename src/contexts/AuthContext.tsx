import { useState, useContext, createContext } from "react";

import { AuthContextInterface } from "../types/AuthContextInterface";
import { ClientUser } from "../types/UserInterface";

import { saveJWT, getJWT } from "../utils/authStorageManager";

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
    const [user, setUser] = useState({} as ClientUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: "" });

    function setErrorTrue(message: string) {
        setError({ state: true, message });
        setTimeout(() => {
            setError({ state: false, message: "" });
        }, 3000);
    }

    async function getUserInfo(jwt: string = "") {
        setIsLoading(true);
        setError({ state: false, message: "" });
        try {
            const userResponse = await fetch("/api/v0/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt || getJWT()}`,
                },
            });

            const data = await userResponse.json();
            if (userResponse.status === 200) {
                setUser(data as ClientUser);
                setIsAuthenticated(true);
            } else {
                setErrorTrue(
                    data === "Invalid token" ? data : "Authentication error"
                );
                setIsAuthenticated(false);
                setUser({} as ClientUser);
            }
        } catch (error: any) {
            setErrorTrue(error.message);
            setIsAuthenticated(false);
            setUser({} as ClientUser);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(email: string, password: string) {
        setIsLoading(true);
        setError({ state: false, message: "" });
        try {
            const authResponse = await fetch("/api/v0/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await authResponse.json();
            if (authResponse.status === 200) {
                saveJWT(data.jwt);
                getUserInfo(data.jwt);
            } else {
                setErrorTrue(
                    data === "Invalid email or password"
                        ? data
                        : "Authentication error"
                );
                setIsAuthenticated(false);
                setUser({} as ClientUser);
            }
        } catch (error: any) {
            setErrorTrue(error.message);
            setIsAuthenticated(false);
            setUser({} as ClientUser);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                getUserInfo,
                isAuthenticated,
                user,
                isLoading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
