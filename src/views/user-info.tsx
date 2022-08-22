import { useEffect } from "react";

import { useAuthContext } from "../contexts/AuthContext";

import UserCard from "../components/UserCard";

const UserInfo = () => {
    const { user, getUserInfo } = useAuthContext();

    useEffect(() => {
        if (getUserInfo) {
            getUserInfo();
        }
    }, [getUserInfo]);

    return <div>{user?.id ? <UserCard /> : null}</div>;
};
export default UserInfo;
