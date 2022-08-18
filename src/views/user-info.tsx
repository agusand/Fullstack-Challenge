import { useEffect } from "react";

import { useAuthContext } from "../contexts/AuthContext";

const UserInfo = () => {
    const { user, getUserInfo } = useAuthContext();

    useEffect(() => {
        if (getUserInfo) {
            getUserInfo();
        }
    }, [getUserInfo]);

    console.log(user);
    return <div>UserInfo</div>;
};
export default UserInfo;
