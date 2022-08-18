import { FormEvent, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAuthContext } from "../contexts/AuthContext";

import ErrorMessage from "./ErrorMessage";

import { validateEmail } from "../utils/emailValidator";

const SignInForm = () => {
    const [validEmail, setValidEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const { login, error } = useAuthContext();

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            login &&
                login(
                    data.get("email") as string,
                    data.get("password") as string
                );
        },
        [login]
    );

    const handleEmailChange = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            if (validateEmail(data.get("email") as string)) {
                setValidEmail(true);
                setEmailError(false);
            } else {
                setValidEmail(false);
                setEmailError(true);
                setTimeout(() => {
                    setEmailError(false);
                }, 3000);
            }
        },
        []
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={validEmail ? handleSubmit : handleEmailChange}
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                {validEmail ? (
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                ) : null}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {validEmail ? "Sign In" : "Next"}
                </Button>
            </Box>
            {error?.state ? (
                <ErrorMessage
                    message={error?.message || "An error has ocurred."}
                />
            ) : null}
            {emailError ? (
                <ErrorMessage message={"The email is incorrect."} />
            ) : null}
        </Box>
    );
};

export default SignInForm;
