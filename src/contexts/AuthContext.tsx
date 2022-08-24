import { useState, useContext, createContext, useCallback } from "react";

import { AuthContextInterface } from "../types/AuthContextInterface";
import { ClientUser } from "../types/UserInterface";

import { saveJWT, getJWT, clearJWT } from "../utils/authStorageManager";

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

    const setErrorTrue = useCallback((message: string) => {
        setError({ state: true, message });
        setTimeout(() => {
            setError({ state: false, message: "" });
        }, 3000);
    }, []);

    const getUserInfo = useCallback(
        async (jwt: string = "") => {
            setIsLoading(true);
            setError({ state: false, message: "" });
            try {
                const userResponse = await fetch(
                    "https://drixit-backend.herokuapp.com/api/v0/users/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${jwt || getJWT()}`,
                        },
                    }
                );

                const data = await userResponse.json();

                const userData = { ...data, id: data._id };

                if (userResponse.status === 200 && data) {
                    setUser(userData as ClientUser);
                    setIsAuthenticated(true);
                } else {
                    setErrorTrue(
                        data === "Invalid token."
                            ? data
                            : "Authentication error."
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
        },
        [setErrorTrue]
    );

    const login = useCallback(
        async (email: string, password: string) => {
            setIsLoading(true);
            setError({ state: false, message: "" });
            try {
                const authResponse = await fetch(
                    "https://drixit-backend.herokuapp.com/api/v0/authenticate",
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
                const data = await authResponse.json();

                console.log(authResponse.status === 200 && data?.token);
                if (authResponse.status === 200 && data?.token) {
                    saveJWT(data.token);
                    getUserInfo(data.token);
                } else {
                    setErrorTrue(
                        data === "The email or password are incorrect."
                            ? data
                            : "Authentication error."
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
        },
        [getUserInfo, setErrorTrue]
    );

    const logout = useCallback(() => {
        clearJWT();
        setIsAuthenticated(false);
    }, []);
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
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
