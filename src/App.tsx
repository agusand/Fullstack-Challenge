import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Login from "./views/login";
import UserInfo from "./views/user-info";

import { AuthContextProvider, useAuthContext } from "./contexts/AuthContext";

const App = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <CssBaseline />
            <div className="App">
                <Grid
                    container
                    component="main"
                    sx={{
                        height: "100vh",
                        width: "100vw",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Grid item>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    isAuthenticated ? (
                                        <Navigate replace to="/user-info" />
                                    ) : (
                                        <Login />
                                    )
                                }
                            />
                            <Route
                                path="/user-info"
                                element={
                                    !isAuthenticated ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <UserInfo />
                                    )
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    !isAuthenticated ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <Navigate replace to="/user-info" />
                                    )
                                }
                            />
                        </Routes>
                    </Grid>
                </Grid>
            </div>
        </BrowserRouter>
    );
};

const AppWrapper = () => {
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    );
};

export default AppWrapper;
