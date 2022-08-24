import { useAuthContext } from "../contexts/AuthContext";

import UserCard from "../components/UserCard";

const UserInfo = () => {
    const { user } = useAuthContext();

    return <div>{user?.id ? <UserCard /> : null}</div>;
};
export default UserInfo;
