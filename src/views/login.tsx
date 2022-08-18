import { useEffect } from "react";

import { useAuthContext } from "../contexts/AuthContext";

import SignInForm from "../components/SignInForm";

const Login = () => {
    const { getUserInfo } = useAuthContext();

    useEffect(() => {
        if (getUserInfo) {
            getUserInfo();
        }
    }, [getUserInfo]);
    return (
        <div>
            <SignInForm />
        </div>
    );
};

export default Login;
